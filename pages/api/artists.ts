import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const { CORE_API_URL: baseUrl } = process.env;

type Data = {
  [x: string]: unknown;
};

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await fetch(`${baseUrl}/artists`);

  if (!response.ok) {
    res.status(500).json({ code: "internal_server_error", message: "Internal Server Error" });
    return;
  }

  const artists = await response.json();

  res.status(200).json(artists as Data);
}
