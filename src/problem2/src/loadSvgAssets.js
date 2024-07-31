const importAll = (requireContext) => requireContext.keys().map(requireContext);

const svgs = importAll(require.context('./assets', false, /\.svg$/));

export default svgs;
