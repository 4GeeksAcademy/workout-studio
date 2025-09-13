// src/components/routineBuilder.js

// Plantillas base: título, objetivo, dificultad, targets/partes y tamaño por bloque
export const ROUTINE_TEMPLATES = [
  {
    id: "full-body-45",
    title: "Full Body 45’",
    goal: "Fuerza general",
    difficulty: "Beginner",
    blocks: [
      { label: "Empuje",   target: ["chest", "triceps", "shoulders"], count: 2 },
      { label: "Tirón",    target: ["back", "biceps"],                count: 2 },
      { label: "Piernas/Core", target: ["quads", "hamstrings", "glutes", "calves", "abs"], count: 2 },
    ],
    scheme: "3×10-12 reps · 60–90s rest",
  },
  {
    id: "upper-lower",
    title: "Upper / Lower Split",
    goal: "Hipertrófia",
    difficulty: "Intermediate",
    blocks: [
      { label: "Upper", target: ["chest", "back", "shoulders", "biceps", "triceps"], count: 4 },
      { label: "Lower", target: ["quads", "hamstrings", "glutes", "calves", "abs"], count: 3 },
    ],
    scheme: "3–4×8–12 reps · 90s rest",
  },
  {
    id: "push-pull-legs",
    title: "Push · Pull · Legs",
    goal: "Volumen",
    difficulty: "Intermediate",
    blocks: [
      { label: "Push", target: ["chest", "shoulders", "triceps"], count: 3 },
      { label: "Pull", target: ["back", "biceps"],                count: 3 },
      { label: "Legs", target: ["quads", "hamstrings", "glutes", "calves"], count: 3 },
    ],
    scheme: "3×8–10 reps · 90s rest",
  },
];

const pickRandom = (arr, n) => {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < n) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
};

export function buildRoutinesFromExercises(exercises, templates = ROUTINE_TEMPLATES) {
  const byTarget = exercises.reduce((map, ex) => {
    const t = (ex.target || "").toLowerCase();
    if (!map[t]) map[t] = [];
    map[t].push(ex);
    return map;
  }, {});

  return templates.map((tpl) => {
    const blocks = tpl.blocks.map((b) => {
      const pool = b.target.flatMap((t) => byTarget[t] || []);
      const chosen = pickRandom(pool, b.count);
      return { ...b, exercises: chosen };
    });

    const allExercises = blocks.flatMap((b) => b.exercises);
    return { ...tpl, blocks, exercises: allExercises };
  });
}
