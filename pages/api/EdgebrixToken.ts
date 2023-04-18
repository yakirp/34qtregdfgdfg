import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClientAuthToken } from "@edgebrix-sdk/server";
import clerkClient from "@clerk/clerk-sdk-node";
var crypto = require("crypto");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, orgId } = getAuth(req);

  const user: any = await clerkClient.users.getUser(userId as string);

  const token = getClientAuthToken(
    process.env.EDGEBRIX_API_KEY as string,
    process.env.EDGEBRIX_API_SECRET as string,
    {
      user_id: user.id as string,
      organization_id: orgId
        ? orgId
        : crypto.createHash("md5").update(userId).digest("hex"),
      user_details: {
        email: user.emailAddresses[0].emailAddress as string,
        name: user.fullName as string,
        profile_picture_url: user.profileImageUrl as string,
      },
      organization_details: {},
    }
  );

  // Return the token
  res.status(200).json({ token });
}
