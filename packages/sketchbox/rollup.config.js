import typescript from "rollup-plugin-typescript2";
import path from "path";

export default {
    input: path.resolve(__dirname, 'src/main.ts'),
    output: {
        dir: path.resolve(__dirname, 'dist'),
        format: 'cjs'
    },
    plugins: [typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
    })]
};
