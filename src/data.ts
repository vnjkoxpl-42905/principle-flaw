export type StudyResource = {
  id: string;
  title: string;
  category: "Schedule" | "Flaw Notes" | "Flaw Homework" | "Principle Notes" | "Principle Homework" | "Bridge";
  description: string;
  useWhen: string;
  driveUrl?: string;
  includedInApp: boolean;
};

export const studyResources: StudyResource[] = [
  {
    id: "flaw-packet",
    title: "Flaw Packet",
    category: "Flaw Notes",
    description: "The complete foundation for Flaw questions.",
    useWhen: "Days 1, 2, 4, 8, 10, 13",
    includedInApp: true
  },
  {
    id: "flaw-notes-strategy",
    title: "Flaw Notes: Strategy",
    category: "Flaw Notes",
    description: "Core 4-Step Method and Answer Choice Styles.",
    useWhen: "Day 1",
    includedInApp: true
  },
  {
    id: "flaw-worksheet",
    title: "Flaw Worksheet",
    category: "Flaw Homework",
    description: "Foundation drill for Assumption vs Objection wording.",
    useWhen: "Day 1",
    includedInApp: true
  },
  {
    id: "flaw-pm-1",
    title: "Flaw Progressive Mastery L1",
    category: "Flaw Homework",
    description: "Introductory difficulty flaws (PT 104-151).",
    useWhen: "Day 1",
    includedInApp: true
  },
  {
    id: "principle-packet",
    title: "Principle Packet",
    category: "Principle Notes",
    description: "Logic for Strengthen and Conform principles.",
    useWhen: "Days 3, 5, 9, 10, 11",
    includedInApp: true
  },
  {
    id: "principle-recap",
    title: "Principle Recap: Trigger & Outcome",
    category: "Principle Notes",
    description: "Mapping rules to facts.",
    useWhen: "Day 3",
    includedInApp: true
  },
  {
    id: "flaw-notes-advanced",
    title: "Flaw Notes: Assumption vs Objection",
    category: "Flaw Notes",
    description: "Deep dive into L2 and L3 traps.",
    useWhen: "Day 4",
    includedInApp: true
  },
  {
    id: "flaw-pm-2",
    title: "Flaw Progressive Mastery L2",
    category: "Flaw Homework",
    description: "Intermediate difficulty flaws.",
    useWhen: "Day 4",
    includedInApp: true
  },
  {
    id: "principle-strengthen-hw",
    title: "Principle Strengthen Homework",
    category: "Principle Homework",
    description: "Drilling the 'justify' relationship.",
    useWhen: "Day 3, 5",
    includedInApp: true
  },
  {
    id: "principle-app-strategy",
    title: "Principle Application strategy",
    category: "Principle Notes",
    description: "Applying rules to check maintenance and arguments.",
    useWhen: "Day 5",
    includedInApp: true
  },
  {
    id: "strengthen-app-hw",
    title: "Strengthen Application Homework",
    category: "Principle Homework",
    description: "Applying principles to diverse stimuli.",
    useWhen: "Day 5, 8",
    includedInApp: true
  },
  {
    id: "timed-strategy-lr",
    title: "Timed Strategy: LR",
    category: "Bridge",
    description: "Pacing and triage methods for timed sections.",
    useWhen: "Day 6, 12",
    includedInApp: true
  },
  {
    id: "flaw-pm-3",
    title: "Flaw Progressive Mastery L3",
    category: "Flaw Homework",
    description: "High-difficulty flaws with complex language.",
    useWhen: "Day 8",
    includedInApp: true
  },
  {
    id: "principle-conform-strategy",
    title: "Principle Conform strategy",
    category: "Principle Notes",
    description: "Fact-to-rule matching techniques.",
    useWhen: "Day 9",
    includedInApp: true
  },
  {
    id: "principle-conform-hw",
    title: "Principle Conform Homework",
    category: "Principle Homework",
    description: "Matching scenarios to stated rules.",
    useWhen: "Day 9, 10, 11",
    includedInApp: true
  },
  {
    id: "parallel-flaw-strategy",
    title: "Parallel Flaw: Pattern Matching",
    category: "Flaw Notes",
    description: "Mirroring logical forms across arguments.",
    useWhen: "Day 11",
    includedInApp: true
  },
  {
    id: "parallel-flaw-bridge",
    title: "Parallel Flaw Bridge Homework",
    category: "Flaw Homework",
    description: "Transitioning from standard Flaws to Parallel forms.",
    useWhen: "Day 11, 14",
    includedInApp: true
  },
  {
    id: "rc-structure-strategy",
    title: "RC: Structure vs Details",
    category: "Bridge",
    description: "Method for identifying author's main point and tone.",
    useWhen: "Day 13",
    includedInApp: true
  }
];

export const scheduleData = [
  {
    day: 1,
    label: "Monday",
    focus: "Flaw Foundation",
    plainGoal: "Learn the basic Flaw method and start Level 1.",
    open: ["flaw-packet"],
    read: ["flaw-notes-strategy"],
    do: ["flaw-worksheet", "flaw-pm-1"],
    review: [
      "Conclusion",
      "Evidence",
      "Assumption",
      "Flaw",
      "Tempting wrong answer"
    ],
    bring: ["2 confusing questions for tutoring"],
    time: "75-100 minutes",
    intensity: "Medium" as const,
    deliverable: "Worksheet completed and Level 1 misses logged"
  },
  {
    day: 2,
    label: "Tuesday",
    focus: "Tutoring Prep & Light Review",
    plainGoal: "Review Monday's work and prepare questions for tutoring.",
    open: ["flaw-packet"],
    read: ["Monday's Review Log entries"],
    do: ["Redo 2 hardest questions from Monday"],
    review: [
      "Process efficiency",
      "Clarity of explanations",
      "Specific confusion points"
    ],
    bring: ["List of 2-3 specific questions for tutoring"],
    time: "30-45 minutes",
    intensity: "Light" as const,
    deliverable: "Ready for tutoring session"
  },
  {
    day: 3,
    label: "Wednesday",
    focus: "Principle Foundation",
    plainGoal: "Learn the Principle framework and start basic drills.",
    open: ["principle-packet", "flaw-packet"],
    read: ["principle-recap"],
    do: ["principle-strengthen-hw", "Redo 2 Flaw Level 1 questions"],
    review: [
      "Rule identification",
      "Trigger mapping",
      "Missing link",
      "Matching outcome"
    ],
    bring: ["1 Principle question that felt slow"],
    time: "60-90 minutes",
    intensity: "High" as const,
    deliverable: "Principle mapping completed and Flaw re-dos logged"
  },
  {
    day: 4,
    label: "Thursday",
    focus: "Flaw Level 2 & Precision",
    plainGoal: "Master harder flaws and refine answer choice breakdown.",
    open: ["flaw-packet"],
    read: ["flaw-notes-advanced"],
    do: ["flaw-pm-2"],
    review: [
      "Label every answer choice",
      "Identify the 'too strong' trap",
      "Spot 'bad match' errors"
    ],
    bring: ["A 'too strong' wrong answer you liked"],
    time: "75-100 minutes",
    intensity: "Medium" as const,
    deliverable: "Level 2 completed with full answer breakdowns"
  },
  {
    day: 5,
    label: "Friday",
    focus: "Principle Application",
    plainGoal: "Apply principles to strengthen arguments and check maintenance.",
    open: ["principle-packet", "flaw-packet"],
    read: ["principle-app-strategy"],
    do: ["principle-strengthen-hw", "strengthen-app-hw", "Redo 2 Flaw misses"],
    review: [
      "Identify the proven condition",
      "Check for necessary vs sufficient",
      "Verify the result"
    ],
    bring: ["1 Application question with a tricky 'if'"],
    time: "60-90 minutes",
    intensity: "Medium" as const,
    deliverable: "Principle and Application homework completed"
  },
  {
    day: 6,
    label: "Saturday",
    focus: "Timed Practice",
    plainGoal: "Measure progress under time and perform deep review.",
    open: ["Schedule"],
    read: ["timed-strategy-lr"],
    do: ["One timed LR section"],
    review: [
      "All Flaw misses",
      "All Principle misses",
      "Flagged questions",
      "Two-choice decisions"
    ],
    bring: ["Your worst miss from the timed section"],
    time: "120 minutes",
    intensity: "High" as const,
    deliverable: "Section score and comprehensive review log"
  },
  {
    day: 7,
    label: "Sunday",
    focus: "Controlled Review Day",
    plainGoal: "Identify recurring patterns and solidify wins.",
    open: ["Review Log"],
    read: ["This week's takeaways"],
    do: ["Redo 3 Flaw misses", "Redo 2 Principle misses"],
    review: [
      "Recurring error types",
      "Timing bottlenecks",
      "Progress against goals"
    ],
    bring: ["Top 3 mistake list for next week"],
    time: "45-60 minutes",
    intensity: "Light" as const,
    deliverable: "Top 3 recurring mistakes list"
  },
  {
    day: 8,
    label: "Monday (Week 2)",
    focus: "Flaw Level 3",
    plainGoal: "Attack high-difficulty flaws and continue application.",
    open: ["flaw-packet", "principle-packet"],
    read: ["flaw-notes-strategy"],
    do: ["flaw-pm-3", "strengthen-app-hw"],
    review: [
      "Abstract match consistency",
      "Tough language mapping",
      "Speed of identification"
    ],
    bring: ["1 Level 3 question that felt alien"],
    time: "90-120 minutes",
    intensity: "Medium" as const,
    deliverable: "Level 3 and Application work logged"
  },
  {
    day: 9,
    label: "Tuesday (Week 2)",
    focus: "Tutoring Prep & Conform",
    plainGoal: "Learn Principle Conform and prepare for session.",
    open: ["principle-packet", "flaw-packet"],
    read: ["principle-conform-strategy"],
    do: ["principle-conform-hw", "Redo 3 Flaw misses"],
    review: [
      "Fact-to-rule matching",
      "Identity mapping",
      "Outcome verification"
    ],
    bring: ["List of Conform questions to review"],
    time: "75-100 minutes",
    intensity: "Medium" as const,
    deliverable: "Ready for tutoring session"
  },
  {
    day: 10,
    label: "Wednesday (Week 2)",
    focus: "Mixed Drills",
    plainGoal: "Handle shifting targets between Flaw and Principle.",
    open: ["flaw-packet", "principle-packet"],
    read: ["Task-switching mindset"],
    do: ["flaw-pm-3", "principle-conform-hw"],
    review: [
      "Task identification speed",
      "Process separation",
      "Accuracy vs speed"
    ],
    bring: ["1 question where you matched the wrong task"],
    time: "90-120 minutes",
    intensity: "High" as const,
    deliverable: "Mixed drill completed"
  },
  {
    day: 11,
    label: "Thursday (Week 2)",
    focus: "Conform & Parallel Bridge",
    plainGoal: "Finish Conform and bridge to Parallel Flaw.",
    open: ["principle-packet"],
    read: ["parallel-flaw-strategy"],
    do: ["principle-conform-hw", "parallel-flaw-bridge"],
    review: [
      "Argument pattern mapping",
      "Answer choice mirroring",
      "Logical force matching"
    ],
    bring: ["A Parallel Flaw answer you thought mirrored perfectly"],
    time: "90-120 minutes",
    intensity: "High" as const,
    deliverable: "Parallel Bridge started"
  },
  {
    day: 12,
    label: "Friday (Week 2)",
    focus: "Final Timed LR",
    plainGoal: "Final section test before wrap-up.",
    open: ["Schedule"],
    read: ["timed-strategy-lr"],
    do: ["One timed LR section"],
    review: [
      "Priority review: Flaws first",
      "Secondary: Principles",
      "Tertiary: Flags"
    ],
    bring: ["A question you flagged but got right"],
    time: "120 minutes",
    intensity: "High" as const,
    deliverable: "Timed section score and prioritized review"
  },
  {
    day: 13,
    label: "Saturday (Week 2)",
    focus: "Final Mastery & RC",
    plainGoal: "Close out Level 4 and incorporate reading.",
    open: ["flaw-packet", "Schedule"],
    read: ["rc-structure-strategy"],
    do: ["flaw-pm-3", "Redo 5 Flaw hard ones", "One untimed RC passage"],
    review: [
      "Full argument mapping for RC",
      "Proof lines for every answer",
      "Flaw Level 4 final patterns"
    ],
    bring: ["1 RC question where the proof felt hidden"],
    time: "120 minutes",
    intensity: "Medium" as const,
    deliverable: "Flaw mastery finished and RC passage logged"
  },
  {
    day: 14,
    label: "Sunday (Week 2)",
    focus: "Strategic Wrap-up",
    plainGoal: "Extract permanent takeaways for future blocks.",
    open: ["Schedule"],
    read: ["Takeaway formatting"],
    do: ["Redo 3 Flaw, 3 Principle, 1 Parallel Flaw"],
    review: [
      "Final takeaways",
      "Next block goals",
      "Confidence check"
    ],
    bring: ["5 key takeaways for your coach"],
    time: "60 minutes",
    intensity: "Light" as const,
    deliverable: "5 clear takeaways logged"
  }
];

export const flawHubData = {
  styles: [
    {
      id: "assumption",
      style: "Assumption style",
      meaning: "This answer describes something the author is relying on without proving it. The answer often sounds like a hidden belief or unstated bridge.",
      language: ["assumes", "presumes", "takes for granted", "fails to establish", "relies on"],
      test: "Make the answer false (Negate it). If making it false makes the argument collapse, the answer is likely correct.",
      correctBehavior: "It identifies something the author absolutely needed for the argument to work.",
      wrongBehavior: "It may describe something helpful, but not necessary. It may also be too strong for what the author actually needs.",
      studentTest: "Would the argument still work if this were false?",
      reviewPrompt: "The author needed to assume ______ because without it ______.",
    },
    {
      id: "objection",
      style: "Objection style",
      meaning: "This answer describes a possibility the author failed to consider. It introduces an alternative explanation, exception, or overlooked case.",
      language: ["fails to consider", "overlooks", "ignores", "neglects", "does not rule out"],
      test: "Treat the answer as true. If it makes the author's conclusion less secure (weakens it), it is likely pointing to the flaw.",
      correctBehavior: "It introduces a possibility that would make the author's conclusion less likely to be true.",
      wrongBehavior: "It may be a possible fact, but it's irrelevant to the specific logic or doesn't actually weaken the conclusion.",
      studentTest: "If this possibility were true, would the argument become weaker?",
      reviewPrompt: "The author overlooked the possibility that ______.",
    },
    {
      id: "abstract",
      style: "Abstract match style",
      meaning: "This answer describes the argument's structure in general, logical language. You have to 'translate' these words back into the specific topic.",
      language: ["concludes X from Y", "confuses X with Y", "infers that", "treats one thing as another", "bases a conclusion on"],
      test: "Plug the stimulus terms into the answer description. Every word in the answer must match a movement in the stimulus.",
      correctBehavior: "It accurately describes the exact movement from evidence to conclusion using logic-jargon.",
      wrongBehavior: "It might sound 'smart' but describe the wrong evidence, the wrong conclusion, or a logical error that didn't happen.",
      studentTest: "Can I plug the stimulus terms into this answer choice exactly?",
      reviewPrompt: "The answer describes the argument because the author moved from ______ to ______.",
    },
  ],
  miniDrill: [
    { stem: "Takes for granted that X", style: "Assumption style", why: "Uses 'takes for granted' which implies a required but unstated belief." },
    { stem: "Fails to consider that Y", style: "Objection style", why: "Uses 'fails to consider' which points to an ignored alternative possibility." },
    { stem: "Presumes that X", style: "Assumption style", why: "Presuming is the same as assuming without proof." },
    { stem: "Overlooks the possibility that Y", style: "Objection style", why: "Explicitly mentions an overlooked possibility." },
    { stem: "Concludes X from evidence that only supports Y", style: "Abstract match style", why: "Describes the relationship between evidence and conclusion in abstract terms." },
    { stem: "Treats a necessary condition as sufficient", style: "Abstract match style", why: "Describes a logical error (Necessary vs Sufficient) using general terminology." },
  ],
  traps: [
    {
      trap: "Too strong",
      meaning: "The answer uses extreme language (always, never, only) when the argument doesn't need that much power.",
      trick: "It sounds right but 'negating' it doesn't break the argument because the author didn't need it to be *that* extreme.",
      avoid: "Check for high-force words in the answer and match them to the force of the stimulus.",
    },
    {
      trap: "Wrong flaw",
      meaning: "The answer describes a REAL logical flaw that just didn't happen in this specific argument.",
      trick: "You recognize the flaw from your notes, so you pick it even though it doesn't fit the facts.",
      avoid: "Ask yourself: 'Did this EXACT error happen here, or am I just happy I know what a circular argument is?'",
    },
    {
      trap: "Reversed logic",
      meaning: "The answer uses the right concepts from the story but flips the direction of the error.",
      trick: "It says the author confused A for B, when the author actually confused B for A.",
      avoid: "Slow down and map the 'from' and 'to' in the answer choice.",
    },
    {
      trap: "Irrelevant",
      meaning: "The answer brings up something that is true in the real world but doesn't affect the link between the evidence and conclusion.",
      trick: "It sounds like a smart objection, but the author could say 'So what? That doesn't change my point.'",
      avoid: "Always stay inside the 'bubble' of the evidence and conclusion.",
    },
    {
      trap: "Contradicted",
      meaning: "The answer claims the author ignored something that was actually stated in the stimulus.",
      trick: "It's a fast read error. You missed the one sentence where the author addressed that point.",
      avoid: "Before picking an 'ignores' answer, double-check that the author really didn't say it.",
    },
    {
      trap: "Describes something true but not flawed",
      meaning: "The answer accurately describes part of the argument, but what it describes isn't a mistake.",
      trick: "You see the author did 'X', and the answer says the author did 'X'. You pick it because it's true.",
      avoid: "Is doing 'X' actually a mistake here? Accuracy is not the same as flaw-mapping.",
    },
    {
      trap: "Attacks the topic",
      meaning: "The answer attacks the subject matter or the person instead of the logic.",
      trick: "It feels satisfying to disagree with the content, so you pick the answer that sounds most critical.",
      avoid: "Stay focused on the *structure* of the reasoning, not the *vibe* of the topic.",
    },
  ],
  famousFlaws: [
    {
      flaw: "Necessary vs. sufficient",
      meaning: "Confusing what is REQUIRED with what is ENOUGH.",
      spot: "'Only if', 'required', 'needs', 'is all that is needed'.",
      ask: "Did the author assume that because a requirement was met, the outcome MUST happen?",
      trap: "Incorrectly identifying which side is necessary.",
    },
    {
      flaw: "Causal reasoning",
      meaning: "Assuming one thing caused another just because they happened together.",
      spot: "'Caused', 'results in', 'leads to', 'responsible for'.",
      ask: "Could there be an alternative cause, a reversed cause, or just a coincidence?",
      trap: "Misinstrumentalizing correlation as causation.",
    },
    {
      flaw: "Part vs. whole",
      meaning: "Assuming what is true of a member is true of the group (or vice versa).",
      spot: "Distinction between 'average', 'each', 'collective', 'individual'.",
      ask: "Is the characteristic of the parts actually transferable to the entity?",
      trap: "Ignoring that a whole can have properties its parts don't (and vice versa).",
    },
    {
      flaw: "Unproven vs. false",
      meaning: "Thinking that because someone failed to prove X, then X must be false.",
      spot: "'No evidence', 'failed to show', 'not established'.",
      ask: "Did the author treat a lack of proof as proof of the opposite?",
      trap: "Assuming 'not proven' means 'proven not'.",
    },
    {
      flaw: "Sampling",
      meaning: "Generalizing from a biased or small sample.",
      spot: "Surveys, polls, specific subgroups used to describe a whole population.",
      ask: "Is this sample representative of the group as a whole?",
      trap: "Generalizing from a sample that is too small or unrepresentative.",
    },
    {
      flaw: "Ad hominem",
      meaning: "Attacking the person's character instead of their argument.",
      spot: "Criticizing motivations, history, or personality of the speaker.",
      ask: "Even if the person is bad, does that make their logic wrong?",
      trap: "Focusing on the person's bias rather than the evidence presented.",
    },
    {
      flaw: "Circular reasoning",
      meaning: "Assuming what you are trying to prove in your premises.",
      spot: "The conclusion and premise are just rewordings of each other.",
      ask: "Does the argument give any independent support, or just repeat itself?",
      trap: "Picking this for every 'bad' argument. It's actually very rare on the LSAT.",
    },
    {
      flaw: "Equivocation",
      meaning: "Using a word in two different ways.",
      spot: "A key term (like 'public' or 'interest') shifts meaning between sentences.",
      ask: "Is the word used in one sense in the evidence and a different sense in the conclusion?",
      trap: "Assuming every vague word is an equivocation.",
    },
    {
      flaw: "Appeal problem",
      meaning: "Relying on popularity or irrelevant authority.",
      spot: "'Most people believe', 'one expert said', 'it's tradition'.",
      ask: "Is the authority actually relevant to the specific topic?",
      trap: "Confusing popularity with truth.",
    },
  ],
  reviewTemplate: [
    { label: "Conclusion", prompt: "What was the author trying to prove?" },
    { label: "Evidence", prompt: "What support did they actually give?" },
    { label: "Assumption", prompt: "What did the author need to be true that they didn't prove?" },
    { label: "Flaw", prompt: "Why is that assumption vulnerable in plain English?" },
    { label: "The Trap", prompt: "Why was my wrong answer tempting? (Too strong? Wrong flaw?)" },
    { label: "The Win", prompt: "Why is the correct answer better than my choice?" },
    { label: "Takeaway", prompt: "Next time I see this pattern, I need to notice ______." },
  ],
  // ... (rest of the drills etc)
  worksheet: [
    { trigger: "Takes for granted that X", identify: "Assumption or Objection?", ask: "Make X false. Does the argument crash?" },
    { trigger: "Fails to consider that Y", identify: "Assumption or Objection?", ask: "Take Y as true. Does the conclusion die?" },
    { trigger: "Presumes that X", identify: "Assumption or Objection?", ask: "Make X false. Does the argument crash?" },
    { trigger: "Overlooks the possibility that Y", identify: "Assumption or Objection?", ask: "Take Y as true. Does the conclusion die?" },
    { trigger: "Ignores the possibility that Y", identify: "Assumption or Objection?", ask: "Take Y as true. Does the conclusion die?" },
    { trigger: "Assumes that X", identify: "Assumption or Objection?", ask: "Make X false. Does the argument crash?" },
    { trigger: "Fails to establish that X", identify: "Assumption or Objection?", ask: "Make X false. Does the argument crash?" },
    { trigger: "Neglects to consider that Y", identify: "Assumption or Objection?", ask: "Take Y as true. Does the conclusion die?" },
  ],
  worksheetAnswers: [
    { wording: "Ignores the possibility that the bottle contained an acidic liquid other than vinegar.", type: "Objection", test: "If true, would it weaken the conclusion?" },
    { wording: "Assumes that a labeling error is proof of an intention to deceive.", type: "Assumption", test: "If false, does the argument collapse?" },
    { wording: "Ignores the possibility that some food additives are harmful to most people.", type: "Objection", test: "If true, would it weaken the conclusion?" },
    { wording: "Presumes that most consumers heed the warning labels.", type: "Assumption", test: "If false, does the argument collapse?" },
    { wording: "Fails to consider that the economy might not improve.", type: "Objection", test: "If true, would it weaken the conclusion?" },
    { wording: "Assumes that the economy will improve in the near future.", type: "Assumption", test: "If false, does the argument collapse?" },
  ],
  progressMastery: {
    level1: [
      { pt: "151", sec: "2", q: "3" },
      { pt: "104", sec: "4", q: "10" },
      { pt: "106", sec: "3", q: "5" },
      { pt: "139", sec: "4", q: "3" },
      { pt: "118", sec: "3", q: "6" },
    ],
    level2: [
      { pt: "127", sec: "3", q: "17" },
      { pt: "105", sec: "1", q: "26" },
      { pt: "106", sec: "3", q: "2" },
      { pt: "110", sec: "2", q: "3" },
      { pt: "103", sec: "3", q: "8" },
    ],
    level3: [
      { pt: "155", sec: "4", q: "20" },
      { pt: "102", sec: "3", q: "23" },
      { pt: "126", sec: "4", q: "15" },
      { pt: "113", sec: "4", q: "22" },
      { pt: "117", sec: "3", q: "6" },
    ],
    level4: [
      { pt: "152", sec: "2", q: "18" },
      { pt: "152", sec: "4", q: "16" },
      { pt: "106", sec: "2", q: "18" },
      { pt: "108", sec: "3", q: "15" },
      { pt: "149", sec: "3", q: "20" },
    ]
  }
};

export const principleHubData = {
  intro: "Principle questions are about rules. The task is to figure out which rule applies, justifies, or matches the situation.",
  varieties: [
    { t: "Rule in Answers", d: "Sometimes the rule is in the answer choices." },
    { t: "Rule in Stimulus", d: "Sometimes the rule is in the stimulus." },
    { t: "Justify", d: "Sometimes the answer must justify the reasoning." },
    { t: "Apply", d: "Sometimes the answer must apply the rule." },
    { t: "Conform", d: "Sometimes the answer must conform to the rule." },
  ],
  framework: [
    { t: "Rule", d: "The general standard or law.", detail: "Look for 'if... then' patterns or broad ethical statements." },
    { t: "Trigger", d: "The condition that activates the rule.", detail: "This is the 'if' part. Does the scenario meet this condition?" },
    { t: "Application", d: "The specific situation or case.", detail: "The facts you are testing against the rule." },
    { t: "Outcome", d: "The result the rule requires or allows.", detail: "The 'then' part. Is this the result the conclusion reached?" },
  ],
  majorTypes: [
    {
      type: "Principle Strengthen",
      meaning: "The answer supplies a rule that makes the argument work.",
      question: "What rule would connect the evidence to the conclusion?",
      spot: "justifies, most helps to justify, if valid... reasoning is correct",
      strategy: "Treat the answer as the 'Missing Premise'. Match evidence to the IF side and the conclusion to the THEN side. The rule must be STRONG.",
      mistake: "Picking a rule that matches the topic but doesn't actually connect the evidence to the conclusion.",
    },
    {
      type: "Strengthen Application",
      meaning: "The rule already exists (in the stimulus). The answer shows the trigger has been met.",
      question: "What specific fact (trigger) still needs to be proven?",
      spot: "the principle stated above, the application of the rule, correctly applied",
      strategy: "Find the stated rule first. Identify the 'Trigger' condition. Search for the answer that provides the facts needed to pull that trigger.",
      mistake: "Picking a fact that sounds helpful but doesn't satisfy the exact wording of the trigger.",
    },
    {
      type: "Principle Conform",
      meaning: "The answer must match or obey the rule given.",
      question: "Does this situation actually trigger the rule and produce the right outcome?",
      spot: "conform to, principle, illustrative of, matches the rule",
      strategy: "Extract the logic of the rule into a simple 'If X, then Y' statement. Reject any answer where X isn't true or Y doesn't happen.",
      mistake: "Applying the rule to a situation that looks similar but doesn't actually meet the trigger conditions.",
    },
    {
      type: "Parallel Flaw Bridge",
      meaning: "This is where Flaw becomes structure matching. You must match the logical pattern.",
      question: "Which of these follows the same flawed movement?",
      spot: "pattern of reasoning, logical error, parallel to",
      strategy: "Identify the Flaw first. State it as a 'Bridge' sentence: 'The author concludes X because Y, but assumes Z.' Find the answer with the same bridge.",
      mistake: "Matching the TOPIC (e.g., both are about medicine) instead of the structure of the reasoning.",
    },
  ],
  practiceConnections: [
    { type: "Principle Strengthen", resources: ["Principle Strengthen Homework", "Strengthen Application Homework"] },
    { type: "Principle Conform", resources: ["Principle Conform Homework"] }
  ],
  reviewTemplate: [
    { label: "Rule", prompt: "What was the general rule involved?" },
    { label: "Trigger", prompt: "What was the condition that activates it?" },
    { label: "Application", prompt: "How did the facts of the story fit the rule?" },
    { label: "Outcome", prompt: "What result did the rule produce?" },
    { label: "Missing Link", prompt: "What gap was the principle trying to fill?" },
    { label: "Mismatch", prompt: "Why did my wrong answer choice not fit the framework?" },
    { label: "Final Lesson", prompt: "Next time I map a principle, I need to check ______." },
  ],
  wrongPatterns: [
    { pattern: "Too broad", catch: "The rule would cover more cases than the argument needs." },
    { pattern: "Too narrow", catch: "The rule only covers part of the stimulus or adds an extra condition." },
    { pattern: "Wrong side of the arrow", catch: "The answer puts the conclusion language on the trigger side." },
    { pattern: "Moral-sounding but mismatched", catch: "The rule sounds reasonable but does not fit the actual evidence/conclusion." },
    { pattern: "Missing trigger", catch: "The application concludes the outcome without proving the condition." }
  ],
  strengthenDrill: [
    { pt: "135", sec: "1", q: "14" },
    { pt: "137", sec: "2", q: "8" },
    { pt: "138", sec: "2", q: "5" },
    { pt: "142", sec: "1", q: "10" },
    { pt: "144", sec: "2", q: "14" }
  ],
  strengthenTimed: [
    { pt: "133", sec: "1", q: "18" },
    { pt: "137", sec: "2", q: "8" },
    { pt: "137", sec: "2", q: "25" },
    { pt: "137", sec: "4", q: "8" },
    { pt: "138", sec: "2", q: "5" },
    { pt: "143", sec: "4", q: "19" },
    { pt: "124", sec: "3", q: "25" },
    { pt: "137", sec: "3", q: "20" }
  ],
  conformDrill: [
    { pt: "131", sec: "1", q: "9" },
    { pt: "127", sec: "3", q: "23" },
    { pt: "124", sec: "1", q: "17" },
    { pt: "130", sec: "1", q: "21" },
    { pt: "125", sec: "4", q: "17" },
    { pt: "129", sec: "3", q: "14" },
    { pt: "134", sec: "2", q: "22" },
    { pt: "131", sec: "1", q: "17" }
  ],
  parallelBridge: [
    { pt: "127", sec: "3", q: "24" },
    { pt: "131", sec: "2", q: "16" },
    { pt: "121", sec: "4", q: "22" },
    { pt: "124", sec: "3", q: "23" },
    { pt: "125", sec: "4", q: "25" },
    { pt: "110", sec: "2", q: "6" },
    { pt: "119", sec: "2", q: "20" },
    { pt: "132", sec: "2", q: "7" },
    { pt: "134", sec: "3", q: "23" },
    { pt: "110", sec: "3", q: "23" },
    { pt: "135", sec: "1", q: "11" },
    { pt: "102", sec: "4", q: "12" }
  ]
};
