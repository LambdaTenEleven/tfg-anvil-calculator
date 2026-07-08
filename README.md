# TFG Anvil Calculator

[![Deploy to GitHub Pages](https://github.com/LambdaTenEleven/tfg-anvil-calculator/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/LambdaTenEleven/tfg-anvil-calculator/actions/workflows/deploy.yml)

A small React app helper for TerraFirmaGreg anvil calculator UI.
It's a little bit vibecoded since I'm not proficient with React, but I tried to clean up it a little bit.
The calculator is inspired by https://github.com/AdrianMiller99/tfg-anvil-calculator but fixes a few bugs that allows it to be used with TerraFirmaGreg and probably other modpacks.

Link to the app: https://lambdateneleven.github.io/tfg-anvil-calculator

## How to use

1. Select up to three smithing instructions that match the in-game anvil GUI.
2. Set each selected instruction's priority: Last, Second Last, Third Last, Not Last, or Any.
3. Enter the target value shown in the anvil GUI.
4. Click Calculate.

If the target value is hard to read, enable Zero-aligned mode in Settings. Align the red and green
pointers in the anvil UI, then calculate with the app's assumed target value of `0`.

The result is split into two parts:

- Setup: actions used to reach the value needed before final instructions. Their order does not matter.
- Finally: actions that must be performed in the shown order to complete the item.

## Running locally

```sh
git clone https://github.com/LambdaTenEleven/tfg-anvil-calculator.git
cd tfg-anvil-calculator
npm install
npm run dev
```

The dev server runs at `http://127.0.0.1:5174/`.

## License

Code in this project is licensed under the European Union Public Licence (EUPL) 1.2. See [LICENSE](./LICENSE) for details.

This project is based on/adapted from [tfg-anvil-calculator](https://github.com/AdrianMiller99/tfg-anvil-calculator) by AdrianMiller99, also licensed under EUPL 1.2.

Texture assets in `public/textures` are derived from PerfectAnvilTFG by Vizzy, licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/). PerfectAnvilTFG is itself a derivative of [Anvil GUI](https://www.curseforge.com/minecraft/texture-packs/tfc-anvil-helper) by Simon, used under CC BY 4.0. The textures were extracted, edited and exported as separate PNG files for use in this app.
