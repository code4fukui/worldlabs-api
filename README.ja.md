# worldlabs-api

テキストから3Dワールドを生成する、[WorldLabs](https://www.worldlabs.ai/) APIと連携するためのDenoモジュールです。

## 機能

- テキストプロンプトから3Dワールドを生成します。
- `Marble 0.1-mini` および `Marble 0.1-plus` モデルをサポートしています。
- ジョブの完了を自動的にポーリングし、準備ができ次第アセットをダウンロードします。
- ダウンロードしたアセットをワールドごとの固有フォルダに整理します。
- アセットには、コライダーメッシュ、パノラマ画像、サムネイル、ガウシアンスプラット（100k、500k、フル解像度）が含まれます。

## 必要条件

- [Deno](https://deno.land/) ランタイム
- WorldLabs APIキー（[WorldLabs](https://www.worldlabs.ai/) から取得可能）

## インストールと設定

1. このリポジトリをクローンするか、`WorldLabs.js` をDenoプロジェクトに追加します。
2. プロジェクトのルートディレクトリに `.env` ファイルを作成します。
3. `.env` ファイルにWorldLabs APIキーを追加します。

    ```
    WLT_APIKEY=your_api_key_here
    ```

## 使用方法

`WorldLabs` クラスをインポートし、静的メソッド `createModel` を呼び出します。スクリプトはコンソールに進行状況を出力し、完了すると生成されたアセットをダウンロードします。

```javascript
import { WorldLabs } from "./WorldLabs.js";

// デフォルトの 'mini' モデルでワールドを生成
// アセットは現在のフォルダ内の新しいディレクトリに保存されます。
await WorldLabs.createModel("A serene cherry blossom garden under a full moon.");

// 'plus' モデルでワールドを生成し、特定の出力ディレクトリに保存
const prompt = "A warp hole suddenly appeared right before my eyes.";
const outputPath = "./output/";
const usePlusModel = true;
await WorldLabs.createModel(prompt, outputPath, usePlusModel);
```

処理が完了すると、`world_id` の名前が付いた新しいディレクトリ（例: `./output/w_xxxxxxxx/`）が作成され、ダウンロードされたすべてのアセットがそこに保存されます。

## APIリファレンス

### `WorldLabs.createModel(text_prompt, [basepath], [isplus])`

- `text_prompt` (string): **必須。** ワールドを生成するために使用するテキストプロンプト。
- `basepath` (string, optional): 出力フォルダが作成されるディレクトリ。デフォルトは `./` です。
- `isplus` (boolean, optional): `true` に設定すると `Marble 0.1-plus` モデルを使用します。デフォルトは `false` で、`Marble 0.1-mini` モデルを使用します。

## 公式ドキュメント

基盤となるAPIの詳細については、[公式のWorldLabs APIドキュメント](https://docs.worldlabs.ai/api)を参照してください。

## ライセンス

MIT License
