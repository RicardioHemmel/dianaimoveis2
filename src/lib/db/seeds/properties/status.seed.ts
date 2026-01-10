// import PropertyStatus from "@/lib/db/models/property/property-details/status.model";
// import { STATUS } from "@/lib/constants/properties/property-status";

// export async function statusSeed() {
//   const status = STATUS.map((name) => {
//     return name;
//   });

//   for (const statusItem of status) {
//     await PropertyStatus.updateOne(
//       { name: statusItem },
//       {
//         $setOnInsert: {name: statusItem},
//       },
//       { upsert: true }
//     );
//   }

//   console.log("Status seed finalizada.");
// }
