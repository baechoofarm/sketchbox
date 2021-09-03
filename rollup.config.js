// import typescript from "rollup-plugin-typescript2";
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import json from "@rollup/plugin-json";
import scss from "rollup-plugin-scss";
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import {terser} from 'rollup-plugin-terser';
import {startCase} from 'lodash';
import pkg from "./package.json";

const input = 'src/main.ts';
const deps = []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

function configure(env, target) {
    const isProd = env === 'production';
    const isUmd = target === 'umd';
    const isModule = target === 'module';
    const isCommonJs = target === 'cjs';

    const onwarn = warning => {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            console.warn(`(!) ${warning.message}`); // eslint-disable-line no-console
        }
    };

    const plugins = [
        scss({
            output: false,
            sourceMap: true,
            failOnError: true
        }),
        json(),
        builtins(),
        nodeResolve({
            browser: true
        }),
        typescript({
            noEmitOnError: false,
            tsconfig: './tsconfig.json'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env),
            preventAssignment: true
        }),
        commonjs({
            exclude: [`./src/**`],
            namedExports: {
                'esrever': ['reverse'],
                'react': ['useRef', 'useEffect', 'useLayoutEffect', 'useContext', 'createContext', 'useState', 'useMemo', 'useCallback' ],
                'react-dom': ['findDOMNode'],
                'react-dom/server': ['renderToStaticMarkup'],
            }
        }),
        babel({
            babelHelpers: 'runtime',
            include: [`./src/**`],
            extensions: ['.js', '.ts', '.tsx'],
            presets: [
                '@babel/preset-typescript',
                [
                    '@babel/preset-env',
                    isUmd
                        ? {modules: false}
                        : {
                            exclude: [
                                '@babel/plugin-transform-regenerator',
                                '@babel/plugin-transform-async-to-generator',
                            ],
                            modules: false,
                            targets: {
                                esmodules: isModule,
                            },
                        },
                ],
                '@babel/preset-react',
            ],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    isUmd
                        ? {}
                        : {
                            regenerator: false,
                            useESModules: isModule,
                        },
                ],
                '@babel/plugin-proposal-class-properties',
            ],
        }),
        globals(),
        isUmd && isProd && terser(),
    ].filter(Boolean);

    if (isUmd) {
        return {
            plugins,
            input,
            onwarn,
            output: {
                format: 'umd',
                file: isProd ? pkg.umdMin : pkg.umd,
                exports: 'named',
                name: startCase(pkg.name).replace(/ /g, ''),
                globals: pkg.umdGlobals,
            },
            external: Object.keys(pkg.umdGlobals || {}),
        };
    }

    if (isCommonJs) {
        return {
            plugins,
            input,
            onwarn,
            output: [
                {
                    file: pkg.main,
                    format: 'cjs',
                    exports: 'named',
                    sourcemap: true,
                },
            ],
            // We need to explicitly state which modules are external, meaning that
            // they are present at runtime. In the case of non-UMD configs, this means
            // all non-Slate packages.
            external: id => {
                return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
            },
        };
    }

    if (isModule) {
        return {
            plugins,
            input,
            onwarn,
            output: [
                {
                    file: pkg.module,
                    format: 'es',
                    sourcemap: true,
                },
            ],
            // We need to explicitly state which modules are external, meaning that
            // they are present at runtime. In the case of non-UMD configs, this means
            // all non-Slate packages.
            external: id => {
                return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
            },
        };
    }
}

const isProd = process.env.NODE_ENV === 'production';

export default [
    configure('development', 'cjs'),
    configure('development', 'module'),
    isProd && configure('development', 'umd'),
    isProd && configure('production', 'umd'),
].filter(Boolean);
