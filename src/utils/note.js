const VARIANTS = ["primary", "secondary", "tertiary"];

// function getRandomNonRepeatVariant(prevVariant) {
//   const availableVariants = VARIANTS.filter(
//     (variant) => variant !== prevVariant
//   );
//   const randomIndex = Math.floor(Math.random() * availableVariants.length);
//   return availableVariants[randomIndex];
// }

function getRandomVariant() {
  const randomIndex = Math.floor(Math.random() * VARIANTS.length);
  return VARIANTS[randomIndex];
}

export { getRandomVariant };
