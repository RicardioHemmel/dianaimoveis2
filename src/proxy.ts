import {
  NextResponse,
  type NextRequest,
  type MiddlewareConfig,
} from "next/server";

// PUBLIC LINKS FROM DIANA IMOVEIS WEBSITE
import { navLinks } from "./lib/constants/links/navbar-links";

const generatedPublicRoutes = navLinks.map((item) => ({
  path: item.path,
  whenAuthenticated: "stay",
}));

// Public pages to redirect
const loginPage = "/diana-corretora";
const dianaImoveisMainPage = "/";
const forgetPasswordPage = "/forget-password";
const resetPasswordPage = "/reset-password";

// Free access routes
const publicRoutes = [
  ...generatedPublicRoutes,
  { path: loginPage, whenAuthenticated: "redirect" }, //Redirect to dashboard if authenticated
  { path: forgetPasswordPage, whenAuthenticated: "redirect" },
  { path: resetPasswordPage, whenAuthenticated: "redirect" },
] as const; // Says to typeScript that the objects inside publicRoutes wont change their values so it can assume a more specific type to them

// Redirect page when not authenticated
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = dianaImoveisMainPage;

// Redirect page when authenticated
const REDIRECT_WHEN_AUTHENTICATED = "/dashboard";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname; // Get the current request path
  const publicRoute = publicRoutes.find((route) => {
    if (route.path === path) return true;
    if (
      route.path === resetPasswordPage &&
      path.startsWith(`${resetPasswordPage}/`) &&
      path.split("/")[2].length === 40 // Avoids DB calls for validating invalid tokens
    ) {
      return true;
    }

    if (path.startsWith("/property/")) {
      return true;
    }

    return false;
  }); // Check if the current path is public

  // Session or Null
  const hasSession = request.cookies.get("authjs.session-token");

  // If user doesn't have token but wants to access a public route, he is able to
  if (!hasSession && publicRoute) {
    return NextResponse.next();
  }

  // If user wants to access a private route and doesn't have a token
  if (!hasSession && !publicRoute) {
    console.log("BARRADO");
    // Redirect to signIn page by cloning the current url and changing the path
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and he's accessing a public route and this route says redirect and goes to an authenticated page
  if (
    hasSession &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - metadata files & static assets (svg, png, etc.)
     * - reset password page
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$|.*\\.png$).*)",
  ],
};
