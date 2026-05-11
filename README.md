# worldlabs-api

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Deno module for interacting with the [WorldLabs](https://www.worldlabs.ai/) API to generate 3D worlds from text.

## Features

-   Generate 3D worlds from text prompts.
-   Supports both `Marble 0.1-mini` and `Marble 0.1-plus` models.
-   Automatically polls for job completion and downloads assets when ready.
-   Organizes downloaded assets into a unique folder for each world.
-   Assets include: collider mesh, panoramic image, thumbnail, and Gaussian splats (100k, 500k, full resolution).

## Requirements

-   [Deno](https://deno.land/) runtime
-   A WorldLabs API key, which can be obtained from [WorldLabs](https://www.worldlabs.ai/).

## Installation and Setup

1.  Clone this repository or add `WorldLabs.js` to your Deno project.
2.  Create a `.env` file in your project's root directory.
3.  Add your WorldLabs API key to the `.env` file:

    ```
    WLT_APIKEY=your_api_key_here
    ```

## Usage

Import the `WorldLabs` class and call the static `createModel` method. The script will log progress to the console and, upon completion, download the generated assets.

```javascript
import { WorldLabs } from "./WorldLabs.js";

// Generate a world with the default 'mini' model
// Assets will be saved to a new directory in the current folder.
await WorldLabs.createModel("A serene cherry blossom garden under a full moon.");

// Generate a world with the 'plus' model and save to a specific output directory
const prompt = "A warp hole suddenly appeared right before my eyes.";
const outputPath = "./output/";
const usePlusModel = true;
await WorldLabs.createModel(prompt, outputPath, usePlusModel);
```

When the process is complete, a new directory named with the `world_id` (e.g., `./output/w_xxxxxxxx/`) will be created, containing all the downloaded assets.

## API Reference

### `WorldLabs.createModel(text_prompt, [basepath], [isplus])`

-   `text_prompt` (string): **Required.** The text prompt used to generate the world.
-   `basepath` (string, optional): The directory where the output folder will be created. Defaults to `./`.
-   `isplus` (boolean, optional): Set to `true` to use the `Marble 0.1-plus` model. Defaults to `false`, which uses the `Marble 0.1-mini` model.

## Official Documentation

For complete details on the underlying API, please refer to the [official WorldLabs API documentation](https://docs.worldlabs.ai/api).

## License

MIT License