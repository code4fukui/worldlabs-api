import { EXT } from "https://code4fukui.github.io/EXT/EXT.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const APIKEY = Deno.env.get("WLT_APIKEY");

export const create = async (text_prompt, plus = false) => {
  const display_name = "";
  const model = plus ? "Marble 0.1-plus" : "Marble 0.1-mini";
  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'WLT-Api-Key': APIKEY,
    },
    body: JSON.stringify({
      display_name,
      model,
      world_prompt: {
        type: 'text',
        text_prompt,
      }
    })
  });
  const data = await response.json();

  return data;
};

export const poll = async (res) => {
  const operation_id = res.operation_id;
  if (!operation_id) throw new Error("no operation_id");
  const response = await fetch('https://api.worldlabs.ai/marble/v1/operations/' + operation_id, {
    method: 'GET',
    headers: {
      'WLT-Api-Key': APIKEY,
    }
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export const download = async (res, basepath = "./") => {
  const dl = async (fn, url) => {
    if (!url) return;
    const dir = basepath + res.response.world_id;
    await Deno.mkdir(dir, { recursive: true });
    const ext = EXT.get(url);
    const bin = await (await fetch(url)).bytes();
    await Deno.writeFile(dir + "/" + fn + "." + ext, bin);
  };
  console.log(res.response.world_marble_url);
  await dl("mesh_collider", res.response.assets.mesh.collider_mesh_url);
  await dl("image_pano", res.response.assets.imagery.pano_url);
  await dl("splats_500k", res.response.assets.splats.spz_urls["500k"]);
  await dl("splats_100k", res.response.assets.splats.spz_urls["100k"]);
  await dl("splats_full", res.response.assets.splats.spz_urls["full_res"]);
  await dl("image_thumb", res.response.assets.thumbnail_url);
};

export class WorldLabs {
  static async createModel(text_prompt, basepath = "./", isplus = false) {
    const res = await create(text_prompt, isplus);
    console.log(res);
    for (;;) {
      await sleep(10 * 1000);
      const chk = await poll(res);
      if (chk.error) throw new Error(chk.error);
      if (chk.done) {
        await download(chk, basepath);
        break;
      }
    }
  }
}