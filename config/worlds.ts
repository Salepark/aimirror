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
    motionPrompt: `The person slowly raises their eyes toward the unfinished architecture.
Morning light gradually enters the stone corridor.
Dust particles drift through the light.
Workers move subtly in the distant background.
The rolled architectural drawing shifts slightly in the person's hand.
Very slow cinematic camera push-in.
Preserve facial identity.`,
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
    motionPrompt: `Fine snow continues falling.
The person's robe and hat straps move gently in the winter wind.
They take one slow step forward and glance toward the palace gate.
Lantern flames flicker.
A distant palace guard crosses through the mist.
Slow cinematic tracking movement.`,
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
    motionPrompt: `The person slowly turns toward the illuminated Eiffel Tower.
Rain falls lightly.
Horse carriages pass in the background.
Gas lamps flicker.
People move through the mist.
Reflections shimmer across the wet street.
Slow camera arc around the subject.`,
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
    motionPrompt: `The person slowly descends one step.
They look toward the stage as the music begins.
Smoke drifts upward.
Musicians move subtly in the background.
Warm lights flicker on brass instruments.
Camera gently follows down the staircase.`,
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
    motionPrompt: `Heavy rain moves across the scene.
The person's long coat and hair move in strong wind.
They slowly turn toward a distant section of the city.
Aerial vehicles pass far behind.
Digital surfaces flicker.
Lightning briefly illuminates the skyline.
Slow camera push toward the subject.`,
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
    motionPrompt: `The astronaut slowly turns toward the approaching dust storm.
Fine red dust blows across the EVA suit.
Reflections move across the transparent helmet visor.
A rover moves quickly toward the settlement behind them.
Warning lights begin flashing on distant habitat structures.
Subtle breathing movement inside the suit.
Slow cinematic camera push-in.
Preserve the person's facial identity.`,
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
    motionPrompt: `Ink slowly spreads from the person's sleeve into the surrounding air.
Brush strokes drift away from the body.
Mist moves between distant mountains.
Wet ink blooms slowly across the paper landscape.
The person raises their hand slightly and watches it transform.
Extremely slow camera movement.`,
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
    motionPrompt: `Billboards flicker between different graphic versions of the person's face.
Printed halftone patterns shift subtly.
The person slowly turns, noticing another giant image of themselves.
Pedestrians move as simplified graphic silhouettes.
Camera slowly rotates through the surreal intersection.`,
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
    motionPrompt: `The person slows and glances over their shoulder.
Candle flames flicker.
Their clothing moves subtly as they walk.
A distant shadow crosses the far end of the corridor.
The sealed letter shifts in their hand.
Camera slowly tracks backward.`,
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
    motionPrompt: `The person takes one slow step out of the ancient chamber.
Their eyes rise toward the enormous structures above.
Distant living architecture moves almost imperceptibly.
Fine particles float through unfamiliar atmospheric light.
A vast shadow slowly crosses the landscape.
Camera gradually pulls backward,
revealing how small the human being is within this civilization.`,
  },
];
