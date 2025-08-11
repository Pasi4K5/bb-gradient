<script lang="ts">
    import { Parser } from "bulletin-board-code";
    import chroma, { type Color, type InterpolationMode } from "chroma-js";

    const interpolationModes: { mode: InterpolationMode; name: string }[] = [
        { mode: "hsl", name: "HSL" },
        { mode: "rgb", name: "RGB" },
    ];

    const parser = new Parser();

    let colors = $state([
        chroma("#ff0000"),
        chroma("#00ff00"),
        chroma("#0000ff"),
    ]);
    let text = $state("Hello, world!");
    let bbCode = $state("");
    let interpolationMode: InterpolationMode = $state("hsl");
    let showClipboardMessage = $state(false);
    let previewBackgroundColor = $state("#ffffff");

    function addColor(): void {
        colors = [...colors, chroma("black")];
    }

    function colorsAreEqual(a: Color, b: Color): boolean {
        const rgbA = a.rgb();
        const rgbB = b.rgb();

        return (
            rgbA[0] === rgbB[0] && rgbA[1] === rgbB[1] && rgbA[2] === rgbB[2]
        );
    }

    function isWhitespace(char: string): boolean {
        return /\s/.test(char);
    }

    async function copyTextToClipboard(): Promise<void> {
        await navigator.clipboard.writeText(bbCode);
        showClipboardMessage = true;
        setTimeout(() => {
            showClipboardMessage = false;
        }, 2000);
    }

    $effect(() => {
        const getHexColorAtPos = (index: number): Color => {
            const relPos = index / (text.length - 1);

            if (isNaN(relPos)) {
                return colors[0];
            }

            const decimalIndex = relPos * (colors.length - 1);
            const sectionStartColor: Color = colors[Math.floor(decimalIndex)];
            const sectionEndColor = colors[Math.ceil(decimalIndex)];
            const sectionPos = decimalIndex - Math.floor(decimalIndex);

            return chroma.mix(
                sectionStartColor,
                sectionEndColor,
                sectionPos,
                interpolationMode,
            );
        };

        let code = "";

        for (let i = 0; i < text.length; i++) {
            let color = getHexColorAtPos(i);
            if (i === 0 || color !== getHexColorAtPos(i - 1)) {
                code += `[color=${color.hex("rgb")}]`;
            }
            code += text[i];

            while (
                i < text.length - 1 &&
                (isWhitespace(text[i + 1]) ||
                    colorsAreEqual(color, getHexColorAtPos(i + 1)))
            ) {
                code += text[i + 1];
                i++;
                color = getHexColorAtPos(i);
            }

            if (i === text.length - 1 || color !== getHexColorAtPos(i + 1)) {
                code += "[/color]";
            }
        }

        bbCode = code;
    });
</script>

<div id="card">
    <h1>BBGradient</h1>
    <div>
        <h2>Text</h2>
        <textarea bind:value={text}></textarea>
    </div>
    <div>
        <h2>Colors</h2>
        {#each colors as color, i}
            <div class="color">
                <input type="color" bind:value={colors[i]} />
                {#if colors.length > 1}
                    <button
                        class="remove"
                        onclick={() =>
                            (colors = colors.filter((c) => c !== color))}
                    >
                        Remove
                    </button>
                {/if}
            </div>
        {/each}
        <button onclick={addColor}>Add color</button>
    </div>
    <div>
        <label>
            Interpolation Mode:
            <select bind:value={interpolationMode}>
                {#each interpolationModes as { mode, name }}
                    <option value={mode}>
                        {name}
                    </option>
                {/each}
            </select>
        </label>
    </div>
    <div class="divider"></div>
    <div>
        <h2>Result</h2>
        <span>BBCode:</span>
        <textarea readonly>{bbCode}</textarea>
        <button onclick={copyTextToClipboard}>Copy</button>
        <span
            id="clipboard-message"
            class={showClipboardMessage ? "" : "hidden"}
        >
            ✔ Copied!
        </span>
    </div>
    <div>
        <h2>Preview</h2>
        <label>
            Preview background:
            <input
                type="color"
                bind:value={previewBackgroundColor}
                class={previewBackgroundColor === "#ffffff"
                    ? "bg-black"
                    : "bg-white"}
            />
        </label>
        <pre
            style={`background-color: ${previewBackgroundColor};`}>{@html parser.toHTML(
                bbCode,
            )}</pre>
    </div>
    <div class="center">
        <a href="https://github.com/Pasi4K5/bb-gradient" target="_blank">
            Source code
        </a>
    </div>
</div>

<style>
    :global(body) {
        background-color: #202530;
    }

    * {
        color: white;
        font-family: "Nunito", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        border-radius: 5px;
    }

    button,
    input[type="color"] {
        cursor: pointer;
        background-color: #202530;
        border: none;
    }

    #card {
        background-color: #2a2f3a;
        border-radius: 10px;
        margin: 20px auto;
        padding: 20px;
        width: 400px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
    }

    textarea {
        background-color: #202530;
        width: 100%;
        height: 100px;
        resize: vertical;
    }

    div.color {
        display: flex;
        margin-bottom: 5px;
    }

    button.remove {
        background-color: #ff5050;
        color: white;
        margin-left: 5px;
    }

    select {
        background-color: #202530;
        color: white;
    }

    h1,
    h2 {
        margin: 0;
    }

    #clipboard-message {
        color: limegreen;
    }

    .hidden {
        opacity: 0;
    }

    .divider {
        background-color: lightgray;
        height: 1px;
    }

    .center {
        font-size: 12px;
        text-align: center;
    }

    pre {
        white-space: pre-wrap;
        word-break: break-word;
        padding: 4px;
    }
</style>
