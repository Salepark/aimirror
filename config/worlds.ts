export interface WorldPreset {
  id: string;
  title: string;
  subtitle: string;
  location?: string;
  year?: string;
  prompt: string;
  resultLabel: string;
}

export const WORLDS: WorldPreset[] = [
  {
    id: "florence-1504",
    title: "FLORENCE",
    subtitle: "Merchant of the Renaissance",
    location: "Florence",
    year: "1504",
    resultLabel: "FLORENCE · 1504",
    prompt: `Create a museum-quality Renaissance oil portrait of the reference person.

Preserve the person's exact facial identity, facial structure, eyes, nose,
mouth, age characteristics, ethnicity and recognizability.

Transform the person into a wealthy Florentine citizen in the year 1504.

Dress them in luxurious early 16th-century Italian Renaissance garments,
rich velvet, layered fabrics, elegant tailoring and historically inspired details.

Place them inside a refined Florentine palazzo with subtle stone architecture.

Lighting should use soft window light and refined chiaroscuro.

The visual result should feel like an authentic Renaissance masterpiece,
not a modern costume photograph.

Oil painting texture, fine brushwork, deep tonal range, museum portrait.

The result must unmistakably look like the same person.`,
  },
  {
    id: "joseon-1792",
    title: "JOSEON",
    subtitle: "Court of King Jeongjo",
    location: "Korea",
    year: "1792",
    resultLabel: "JOSEON · 1792",
    prompt: `Create a dignified late-Joseon dynasty portrait of the reference person.

Preserve the person's facial identity, age, ethnicity and recognizability.

Transform clothing and setting into Korea in the year 1792,
during the reign of King Jeongjo.

Dress the subject in historically inspired Joseon formal clothing,
refined silk fabrics, restrained colors and traditional details.

Use the visual language of traditional Korean royal and scholar portraiture,
combined with subtle realistic depth.

Background should be minimal, elegant and historically appropriate.

Avoid fantasy costume design.

The person must clearly remain recognizable as the same individual.`,
  },
  {
    id: "paris-1889",
    title: "PARIS",
    subtitle: "Belle Époque Citizen",
    location: "Paris",
    year: "1889",
    resultLabel: "PARIS · 1889",
    prompt: `Transform the reference person into a sophisticated Parisian citizen in 1889.

Preserve the person's facial identity and recognizability exactly.

Dress them in elegant Belle Époque fashion with refined tailoring.

The environment should evoke Paris during the Exposition Universelle,
with warm atmospheric lighting and subtle late-19th-century architecture.

Create a painterly portrait influenced by refined French academic painting
and early modern portrait photography.

Elegant, atmospheric, cinematic, historically believable.

The same person must remain unmistakably recognizable.`,
  },
  {
    id: "new-york-1925",
    title: "NEW YORK",
    subtitle: "Jazz Age Citizen",
    location: "New York",
    year: "1925",
    resultLabel: "NEW YORK · 1925",
    prompt: `Transform the reference person into a stylish New Yorker in 1925.

Preserve facial identity, age and ethnicity.

Dress the subject in refined Jazz Age clothing,
with period-appropriate tailoring and subtle Art Deco influence.

Set the portrait inside an elegant Manhattan interior
with warm tungsten lighting and hints of Art Deco architecture.

Create a cinematic portrait with early 20th-century photographic character,
rich contrast and sophisticated atmosphere.

Do not make the face generic.

The subject must clearly remain the same person.`,
  },
  {
    id: "seoul-2089",
    title: "SEOUL",
    subtitle: "Citizen of the Future",
    location: "Seoul",
    year: "2089",
    resultLabel: "SEOUL · 2089",
    prompt: `Transform the reference person into a citizen of Seoul in the year 2089.

Preserve facial identity, age characteristics and ethnicity.

Create sophisticated futuristic clothing,
advanced smart textiles, subtle luminous materials,
minimal wearable technology and elegant Korean-influenced future design.

Avoid generic cyberpunk clichés.

The background should show a believable future Seoul,
layered vertical architecture, ambient digital surfaces,
subtle Hangul-inspired visual systems and atmospheric city light.

The image should feel sophisticated, humane and plausible,
not dystopian.

Cinematic future portrait.

The face must remain clearly recognizable as the same person.`,
  },
  {
    id: "mars-2164",
    title: "MARS",
    subtitle: "Settler of the Red Planet",
    location: "Mars",
    year: "2164",
    resultLabel: "MARS · 2164",
    prompt: `Transform the reference person into a human resident of Mars in 2164.

Preserve exact facial identity and recognizability.

Dress the subject in sophisticated lightweight Martian habitat clothing,
advanced environmental fabrics and subtle life-support technology.

Avoid bulky astronaut suits unless visually necessary.

Show a refined Martian settlement interior,
with red terrain visible through architectural glass.

Lighting should combine warm Martian sunlight
with controlled interior illumination.

The portrait should feel scientifically plausible,
quiet, intelligent and deeply human.

The person must unmistakably remain the same individual.`,
  },
  {
    id: "ink-world",
    title: "INK WORLD",
    subtitle: "A Figure of Ink and Mist",
    resultLabel: "INK WORLD",
    prompt: `Reimagine the reference person inside a poetic East Asian ink-wash world.

Preserve the person's facial identity and recognizability.

Render the face with enough detail to remain clearly identifiable,
while allowing clothing, hair, atmosphere and environment
to dissolve into expressive black ink and water.

Surround the figure with mist, mountains, empty space
and flowing brush gestures.

Use restrained monochrome ink tones,
subtle paper texture and expressive calligraphic energy.

Avoid cartoon or anime rendering.

The result should feel like a contemporary museum-scale ink artwork
while clearly preserving the same person.`,
  },
  {
    id: "pop-world",
    title: "POP WORLD",
    subtitle: "Icon of the Pop Era",
    resultLabel: "POP WORLD",
    prompt: `Transform the reference person into a bold pop-art portrait.

Preserve facial identity and recognizability.

Use strong graphic shapes, simplified tonal areas,
screen-print texture, halftone patterns and energetic composition.

Draw inspiration from the visual language of 1960s pop art
without directly copying any specific copyrighted artwork.

Clothing and background may become highly graphic and stylized.

The face must remain identifiable as the same person.

Museum-quality contemporary pop portrait.`,
  },
  {
    id: "baroque-1642",
    title: "BAROQUE",
    subtitle: "Aristocrat of Europe",
    location: "Europe",
    year: "1642",
    resultLabel: "EUROPE · 1642",
    prompt: `Create a dramatic European Baroque portrait of the reference person in 1642.

Preserve exact facial identity and recognizability.

Dress the subject in sophisticated 17th-century aristocratic clothing,
rich dark fabrics and refined period details.

Use powerful chiaroscuro,
deep black background,
dramatic directional light
and painterly realism.

The result should feel monumental, serious and museum-worthy.

Avoid theatrical costume photography.

The face must unmistakably remain the same person.`,
  },
  {
    id: "unknown-civilization",
    title: "UNKNOWN",
    subtitle: "Citizen of a Forgotten Future",
    year: "7,842",
    resultLabel: "UNKNOWN · YEAR 7,842",
    prompt: `Transform the reference person into a citizen of an unknown human civilization
in the year 7842.

Preserve exact facial identity, age characteristics and recognizability.

The world should feel unfamiliar but believable.

Create clothing, architecture and materials that do not resemble
standard cyberpunk, medieval fantasy or conventional science fiction.

Use elegant unfamiliar textiles,
organic engineered surfaces,
subtle symbolic systems,
advanced but quiet technology
and a calm monumental atmosphere.

The image should feel archaeological,
as if this future civilization has already existed for thousands of years.

The person must clearly remain the same individual.

Create a mysterious, beautiful and museum-quality portrait.`,
  },
];
