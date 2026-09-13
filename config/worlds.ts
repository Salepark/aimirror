export interface LivingEffectConfig {
  type: string;
  intensity?: number;
  cameraMotion?: "push-in" | "pull-back" | "minimal";
}

export interface WorldPreset {
  id: string;
  title: string;
  year?: string;
  resultLabel: string;

  role: string;
  event: string;

  imagePrompt: string;

  // Reserved for v0.5 (living-portrait video). Stored now, never sent to any
  // API in v0.4 — do not wire this into a generation call.
  motionPrompt: string;

  // v0.5.2 default living-portrait effect: zero-cost, browser-side only.
  livingEffect: LivingEffectConfig;
}

export const WORLDS: WorldPreset[] = [
  {
    id: "florence-1504",
    title: "FLORENCE",
    year: "1504",
    resultLabel: "FLORENCE · 1504",
    role: "Florentine architect and intellectual",
    event: "At dawn, checking on the construction site of a great unfinished cathedral.",
    imagePrompt: `FLORENCE, 1504.

Transform the same person into a respected Florentine architect,
scholar and patron during the height of the Renaissance.

It is early morning.

The person is walking through a monumental Renaissance construction site,
carrying rolled architectural drawings and a leather-bound notebook.

Stonecutters and craftsmen work in the distance.
Scaffolding rises above unfinished classical architecture.

The person's clothing is historically convincing:
deep luxurious Renaissance fabric,
layered wool and velvet,
fine tailoring,
weathered naturally by daily life.

A cool Tuscan dawn enters through enormous stone arches.

The subject has stopped momentarily and looks toward an unfinished structure,
as if reconsidering an important architectural decision.

Three-quarter-body environmental portrait.
Subject slightly off-center.
Natural body posture.
Subtle movement in clothing.

Warm sunlight begins touching the distant stone
while the foreground remains softly shadowed.

Visually combine the psychological depth of Renaissance portraiture
with the scale and realism of contemporary cinematic photography.

Do not create a museum portrait against a plain background.

We have caught this person in the middle of a real morning in Florence.`,
    motionPrompt: `The construction site comes to life around the person.
Stonecutters and craftsmen work steadily in the background,
scaffolding creaks faintly, loose fabric and canvas sheets shift in the
morning breeze, and fine dust drifts through the shafts of dawn light.
The person looks down at the architectural drawings in their hands,
then lifts their gaze to study the unfinished structure ahead,
as if quietly reconsidering a decision.
Camera performs a slow, gentle push-in toward the person.
The scene settles as the person's attention returns calmly to the site.`,
    livingEffect: { type: "florence-dust", cameraMotion: "push-in" },
  },
  {
    id: "joseon-1792",
    title: "JOSEON",
    year: "1792",
    resultLabel: "JOSEON · 1792",
    role: "Royal scholar-official",
    event: "At snowy dawn, rushing to the palace with an urgent report.",
    imagePrompt: `HANYANG, JOSEON DYNASTY, 1792.

Transform the same person into a respected Joseon scholar-official
during the reign of King Jeongjo.

It is dawn after fresh snowfall.

The person is walking quickly toward the palace
carrying a carefully wrapped royal report.

Dress the subject in historically convincing Joseon official clothing
appropriate to the period and role,
including a proper traditional hat and layered winter garments.

Do not create fantasy-Korean costume.

Fine snow falls through the air.

Traditional tiled roofs and palace walls disappear into cold morning mist.

A few lanterns still glow.

The person's expression is serious and purposeful.
Something important has happened.

Capture the subject mid-step rather than posing.

Three-quarter-body cinematic composition.
Slightly low camera.
Fabric moves subtly with the winter wind.

Cold blue-gray dawn contrasted with warm lantern light.

The image should feel like a frame from an exceptionally well-researched
historical Korean feature film.

Not a royal portrait.
Not a costume photograph.

This person has somewhere urgent to be.`,
    motionPrompt: `Snow falls steadily through the cold dawn air.
A gust of wind moves the person's robe and hat straps as distant
lanterns flicker along the palace wall. Holding the wrapped royal
report firmly, the person quickens their pace toward the palace,
expression serious and purposeful, boots pressing fresh tracks into
the snow. Mist drifts low across the ground behind them.
Camera performs a slow tracking move alongside the person.
As the palace gate draws near, the person's stride settles into a
steady, determined walk.`,
    livingEffect: { type: "joseon-snow", cameraMotion: "push-in" },
  },
  {
    id: "paris-1889",
    title: "PARIS",
    year: "1889",
    resultLabel: "PARIS · 1889",
    role: "Writer and intellectual",
    event: "On the night the Eiffel Tower is lit for the first time.",
    imagePrompt: `PARIS, 1889.

Transform the same person into a Parisian writer and intellectual
during the Exposition Universelle.

Night has just fallen.

The person has stepped from a horse-drawn carriage
onto a rain-wet Paris street.

Behind them, the newly completed Eiffel Tower glows dramatically
through mist for the first time.

Crowds gather in astonishment.
Carriages move past.
Gas lamps reflect on wet pavement.

Dress the person in sophisticated late-19th-century Parisian clothing,
historically believable and naturally worn.

The person turns slightly toward the illuminated tower,
caught between disbelief and fascination.

Do not make them stare directly at the camera.

Medium-wide environmental portrait.
Off-center composition.

Wet street reflections.
Atmospheric Paris fog.
Warm gaslight against cool evening blue.

The scene should feel like a lost cinematic moment from 1889,
not a vintage studio photograph.`,
    motionPrompt: `Light rain falls steadily over the Paris street.
A carriage rolls past behind the person, gaslight shimmering and
reflecting across the wet pavement, and distant crowds murmur near the
illuminated Eiffel Tower. The person turns their head slightly to look
first at the passing street, then up toward the glowing Tower rising
through the mist, their expression shifting from disbelief to
fascination. Their coat stirs gently in the damp night breeze.
Camera performs a slow push-in as the person's gaze settles on the
Tower.`,
    livingEffect: { type: "paris-rain", cameraMotion: "push-in" },
  },
  {
    id: "new-york-1925",
    title: "NEW YORK",
    year: "1925",
    resultLabel: "NEW YORK · 1925",
    role: "Jazz Age composer and musician",
    event: "Descending into a Harlem jazz club as the band starts playing their song.",
    imagePrompt: `NEW YORK CITY, 1925.

Transform the same person into a composer and musician
during the height of the Jazz Age.

The person is descending a narrow staircase
into a crowded underground Harlem jazz club.

Music and cigarette smoke rise from below.

Musicians prepare on stage.
Silhouettes of dancers move beyond the stairway.

Dress the person in an elegant but lived-in 1920s evening suit,
period-correct tailoring and accessories.

They hold a folded musical score in one hand.

The subject pauses halfway down the stairs,
hearing the band begin to play their composition.

Dynamic diagonal composition.
Three-quarter-body.
Camera positioned slightly below stair level.

Warm tungsten club light rises from below,
while cooler street light remains behind.

Smoke, brass reflections and deep shadows create visual depth.

This is a backstage moment before something important happens.

Not an Art Deco fashion shoot.
Not a studio portrait.`,
    motionPrompt: `The jazz club stirs to life below the stairway.
Musicians on stage begin to play, cigarette smoke curls upward through
warm tungsten light, and silhouettes of dancers sway faintly beyond the
stairs. Hearing the band start their composition, the person descends
a few more steps, gripping the folded musical score a little tighter
and glancing down toward the stage with quiet anticipation.
Camera performs a slow tracking move following the person down the
stairs. Near the bottom, their pace eases into a confident, unhurried
walk.`,
    livingEffect: { type: "newyork-smoke", cameraMotion: "push-in" },
  },
  {
    id: "seoul-2089",
    title: "SEOUL",
    year: "2089",
    resultLabel: "SEOUL · 2089",
    role: "Urban systems architect",
    event: "On an elevated walkway during a storm, spotting a citywide system failure.",
    imagePrompt: `SEOUL, 2089.

Transform the same person into an urban systems architect
living in Seoul near the end of the 21st century.

A powerful summer storm is passing through the city at night.

The person stands on a transparent elevated pedestrian bridge
hundreds of meters above Seoul.

They have just noticed something unusual happening across the city.

The person wears a sophisticated long coat
made from programmable technical textile,
with subtle embedded interfaces and Korean-influenced structural design.

Avoid generic cyberpunk clothing.

Hair and coat move strongly in the storm wind.

Behind them:
vast vertical neighborhoods,
autonomous aerial transit,
layered pedestrian systems,
rain-covered architecture,
subtle Hangul information displays
and distant mountains barely visible beyond the city.

Lightning illuminates the clouds.

The person turns away from the camera,
looking toward a distant section of the city that has suddenly gone dark.

Wide environmental portrait.
Three-quarter profile.
Strong foreground/background depth.

Rain streaks across the lens.
Reflections move across glass surfaces.

Sophisticated, believable Korean future design.

Avoid Blade Runner imitation.
Avoid neon cyberpunk clichés.

This should feel like Seoul actually continued evolving for another 60 years.`,
    motionPrompt: `Heavy rain sweeps across the elevated walkway as the storm builds.
Autonomous aerial vehicles drift through the skyline behind the
person, and lightning briefly illuminates the clouds. Across the city,
an entire section of lights suddenly goes dark. The person's coat
whips in the wind as they turn slightly toward the darkened district,
watching intently, their expression shifting to alarm.
Camera performs a slow push-in on the person as the storm intensifies
around them. The scene settles with the person still fixed on the
anomaly, rain streaking past.`,
    livingEffect: { type: "seoul-storm", cameraMotion: "push-in" },
  },
  {
    id: "mars-2164",
    title: "MARS",
    year: "2164",
    resultLabel: "MARS · 2164",
    role: "Exploration commander",
    event: "Caught outside the settlement as a massive dust storm approaches.",
    imagePrompt: `MARS, 2164.

Transform the same person into the commander of a Mars exploration team.

The person is outside the settlement
when an enormous dust storm begins approaching across the horizon.

They wear a complete advanced Mars EVA pressure suit.

A sealed transparent pressurized helmet is mandatory.

The face must remain clearly visible through the visor
and unmistakably recognizable as the reference person.

The helmet includes realistic seals,
communications hardware,
environmental sensors and subtle heads-up reflections.

The EVA suit contains visible life-support systems,
technical layers, joints and equipment,
showing dust and signs of actual field use.

No exposed head.
No casual clothing.

The person has stopped during an expedition
and is looking toward the approaching storm.

Behind them:
a large Martian settlement,
pressurized habitat structures,
rovers returning toward the base,
communication towers,
distant mountains disappearing into red atmospheric dust.

Powerful Martian sunset breaks through the storm.

Dust moves violently around the person's boots and suit.

Three-quarter or near-full-body composition.
Slightly low camera angle.
Subject not perfectly centered.

This must feel like an expensive science-fiction feature film
grounded in plausible Mars exploration technology.

Not a portrait of someone wearing a spacesuit.

This person is actually trying to survive on Mars.`,
    motionPrompt: `The dust storm advances rapidly across the Martian horizon.
Rover headlights sweep back toward the settlement as base lights flare
against the reddening sky, and the person's suit fabric snaps in the
rising wind. The person turns their helmeted head to track the
storm's approach, a faint reflection shifting across the sealed
transparent visor, their recognizable face still clearly visible
underneath. Fine red dust streaks past in the foreground.
Camera performs a slow pull-back, revealing the settlement behind the
person as they hold their ground against the wind.`,
    livingEffect: { type: "mars-dust", cameraMotion: "push-in" },
  },
  {
    id: "ink-world",
    title: "INK WORLD",
    resultLabel: "INK WORLD",
    role: "A traveler through a world made of ink",
    event: "Their surroundings, and their own body, begin dissolving into ink.",
    imagePrompt: `INK WORLD.

The same recognizable person stands inside a vast East Asian ink landscape.

This is not simply an ink-style portrait.

The physical world itself is made from ink, water and paper.

The person's face remains sufficiently realistic and recognizable,
but their clothing gradually dissolves into expressive black brush strokes.

One side of the body begins transforming into flowing ink.

Behind the person,
enormous mountains emerge from washes of black pigment and mist.

Water becomes empty white paper.
Clouds become bleeding ink.
Birds appear as single calligraphic gestures.

The person looks toward their own hand,
realizing that it too is beginning to dissolve into ink.

Asymmetrical composition.
Large negative space.
Full or three-quarter body.

Extremely restrained palette:
black ink,
warm paper,
subtle gray washes.

Physical ink texture,
water blooms,
dry-brush marks,
pigment edges.

Do not create anime.
Do not create a normal photograph with an ink filter.

Reality itself is becoming a painting.`,
    motionPrompt: `Ink continues to spread from the person's sleeve, flowing outward in
slow expressive strokes that dissolve part of their clothing into
moving brushwork. Wet ink blooms and spreads across the paper
landscape behind them, and distant mountains shift subtly within the
drifting mist. The person watches their own hand as more of it
dissolves into ink, their face remaining clear and recognizable
throughout. Camera holds mostly still with only a minimal drift,
matching the quiet, painterly mood.
The ink's spread gently slows, leaving the scene suspended mid-
transformation.`,
    livingEffect: { type: "ink-diffusion", cameraMotion: "minimal" },
  },
  {
    id: "pop-world",
    title: "POP WORLD",
    year: "1968",
    resultLabel: "POP WORLD",
    role: "A person whose face has become mass media",
    event: "Discovering their own face reproduced across every screen in the city.",
    imagePrompt: `POP WORLD, ALTERNATE 1968.

Preserve the person's recognizable facial identity,
but transform reality into a living graphic media environment.

The person stands in a surreal city intersection.

Huge billboards, newspapers, television screens
and product packages surrounding them
all contain stylized variations of their own face.

The subject looks around,
confused by the endless reproduction of their identity.

Use bold graphic areas,
screen-print textures,
halftone patterns,
misregistration,
commercial typography fragments
and strong visual rhythm.

The person's physical body remains dimensional,
while the surrounding world increasingly becomes flat graphic media.

Dynamic wide composition.
Urban movement.
Strong perspective.

Do not directly reproduce any specific existing artwork.

Do not create a simple four-panel portrait.

The idea is:
a person discovers that the entire culture has turned their identity into an image.`,
    motionPrompt: `The surrounding billboards, screens and newspapers animate around the
person, cycling through stylized graphic versions of their own face.
Halftone patterns pulse and shift across surfaces, and simplified
graphic silhouettes of pedestrians drift past in the background.
The person turns their head slowly, looking from one screen to the
next with growing confusion, recognizing their own image endlessly
repeated. Camera performs a slow, playful push-in on the person.
The barrage of imagery settles into a steady rhythmic pulse around
them.`,
    livingEffect: { type: "pop-halftone", cameraMotion: "minimal" },
  },
  {
    id: "baroque-1642",
    title: "EUROPE",
    year: "1642",
    resultLabel: "EUROPE · 1642",
    role: "Senior diplomat on the eve of war",
    event: "Carrying a sealed letter down a candlelit palace corridor at night.",
    imagePrompt: `EUROPE, 1642.

Transform the same person into a senior diplomat
during a dangerous period of 17th-century European conflict.

It is late at night inside a vast palace.

The person walks alone through a candlelit corridor,
holding a sealed diplomatic letter.

They have just received information
that could alter the course of a war.

Dress the subject in historically convincing
17th-century European court clothing,
rich dark fabric,
restrained aristocratic detail,
natural wear and physical texture.

Do not create theatrical costume.

The person turns slightly,
as if hearing footsteps behind them.

Strong directional candlelight.
Deep chiaroscuro.
Large areas disappearing into darkness.

Three-quarter-body composition.
Long architectural perspective behind the person.

Candles recede through the corridor.
The sealed letter remains visible but not dominant.

The visual language may evoke the psychological intensity
and dramatic lighting of great Baroque painting,
while remaining a believable cinematic event.

Something dangerous is happening outside the frame.`,
    motionPrompt: `Candle flames flicker along the corridor, shadows shifting across the
walls as fine dust drifts through the light. Holding the sealed letter
close, the person moves forward through the corridor at a steady,
urgent pace. Somewhere far down the hall, a faint shadow crosses once,
implying distant footsteps, and the person glances briefly over their
shoulder before continuing on. Camera performs a slow tracking move
alongside the person through the chiaroscuro light.
Their pace steadies again as the corridor stretches on ahead.`,
    livingEffect: { type: "baroque-candle", cameraMotion: "push-in" },
  },
  {
    id: "unknown-civilization",
    title: "UNKNOWN",
    year: "7842",
    resultLabel: "UNKNOWN · YEAR 7,842",
    role: "The last person to wake from the 21st century",
    event: "Waking after 5,800 years to witness a civilization beyond human recognition.",
    imagePrompt: `UNKNOWN EARTH, YEAR 7842.

The same person is a human being from the early 21st century
who has awakened after approximately 5,800 years of suspended animation.

Preserve the person's recognizable identity.

They stand at the threshold of an ancient recovery chamber.

Their clothing combines remnants of old human technology
with unfamiliar materials placed on them by an unknown civilization.

The chamber opens onto an unimaginably vast city.

But this is not a conventional futuristic city.

Human civilization has disappeared or transformed beyond recognition.

Enormous structures appear partly grown,
partly engineered,
partly geological.

Architecture operates on scales that make the person appear small.

There are no recognizable cars,
skyscrapers,
cyberpunk signs
or familiar science-fiction clichés.

Unfamiliar living structures move slowly in the distance.

Strange atmospheric phenomena illuminate the horizon.

The person takes their first step outside the chamber
and looks upward.

Their expression is not fear.
It is incomprehension and awe.

Wide cinematic composition.
The human figure occupies a relatively small but clearly visible portion of the frame.

Use monumental scale,
deep atmospheric perspective
and unfamiliar physical materials.

The scene should feel simultaneously archaeological and futuristic,
as if we are looking at the ruins of a future
that lasted thousands of years.

Do not explain the civilization visually.
Preserve mystery.

This person remembers our world.

Nothing around them does.`,
    motionPrompt: `The monumental post-human environment slowly stirs to life around
the person. Distant structures shift and pulse with unfamiliar light,
luminous particles drift through the air, and something vast moves
almost imperceptibly on the horizon. The person takes a slow step
forward from the chamber threshold and tilts their head upward,
their expression shifting into quiet awe as the scale of the world
becomes clear. Camera performs a slow pull-back, revealing more of the
monumental scale surrounding the small human figure.
The person remains still, gazing upward, as the scene settles.`,
    livingEffect: { type: "unknown-haze", cameraMotion: "pull-back" },
  },
];
