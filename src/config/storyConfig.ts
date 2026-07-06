export type StoryKey = "brother" | "bestFriend";

export type MemoryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
  title: string;
};

type StoryImageKey =
  | "college"
  | "stranger"
  | "familiar"
  | "trusted"
  | "losing"
  | "finalTogether";

export type ImageSceneConfig = {
  align?: "left" | "right" | "center";
  eyebrow?: string;
  image: StoryImageKey;
  label: string;
  lines: string[][];
  title: string;
  type: "image";
};

export type TextSceneConfig = {
  label: string;
  lines: string[];
  title?: string;
  type: "text";
};

export type ConversationSceneConfig = {
  eyebrow: string;
  label: string;
  lines: string[];
  messages: string[];
  type: "conversation";
};

export type GallerySceneConfig = {
  eyebrow: string;
  label: string;
  title: string;
  type: "gallery";
};

export type StorySceneConfig =
  | ImageSceneConfig
  | TextSceneConfig
  | ConversationSceneConfig
  | GallerySceneConfig;

export type StoryConfig = {
  audio: {
    backgroundSrc: string;
  };
  birthday: {
    day: number;
    from: string;
    month: string;
    name: string;
    year: number;
  };
  final: {
    blackoutLines: string[];
    bodyLines: string[];
    heading: string;
    imageAlt: string;
    small: string;
    title: string;
    align?: "left" | "right";
  };
  images: Record<StoryImageKey, string>;
  intro: string[];
  memories: MemoryItem[];
  route: string;
  scenes: StorySceneConfig[];
};

const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const sharedImages: StoryConfig["images"] = {
  college: assetPath("birthday-media/story-03.jpeg"),
  stranger: assetPath("birthday-media/story-04.jpeg"),
  familiar: assetPath("birthday-media/story-08.jpeg"),
  trusted: assetPath("birthday-media/story-05.jpeg"),
  losing: assetPath("birthday-media/story-06.jpeg"),
  finalTogether: assetPath("birthday-media/story-02.jpeg"),
};

const bestFriendImages: StoryConfig["images"] = {
  college: assetPath("birthday-media/uploaded-1.jpg"),
  stranger: assetPath("birthday-media/uploaded-5.jpg"),
  familiar: assetPath("birthday-media/uploaded-4.jpg"),
  trusted: assetPath("birthday-media/uploaded-2.jpg"),
  losing: assetPath("birthday-media/uploaded-5.jpg"),
  finalTogether: assetPath("birthday-media/uploaded-3.jpg"),
};

const sharedMemories: MemoryItem[] = [
  {
    type: "image",
    title: "Sunlit Frame",
    caption: "A moment that quietly became part of the story.",
    src: assetPath("birthday-media/story-01.jpeg"),
  },
  {
    type: "image",
    title: "Celebration Mode",
    caption: "The familiar face that started feeling like home.",
    src: assetPath("birthday-media/story-02.jpeg"),
  },
  {
    type: "image",
    title: "The Daylight",
    caption: "Countless ordinary days that turned into memories.",
    src: assetPath("birthday-media/story-03.jpeg"),
  },
  {
    type: "image",
    title: "The Close-Up",
    caption: "Proof that some people become family by choosing to stay.",
    src: assetPath("birthday-media/story-04.jpeg"),
  },
  {
    type: "image",
    title: "Cafe Pause",
    caption: "Some memories feel calm the moment you look back at them.",
    src: assetPath("birthday-media/story-05.jpeg"),
  },
  {
    type: "image",
    title: "Roadside Frame",
    caption: "A simple stop, a good photo, another page in the story.",
    src: assetPath("birthday-media/story-06.jpeg"),
  },
  {
    type: "image",
    title: "Another Angle",
    caption: "Same day, same presence, another memory saved.",
    src: assetPath("birthday-media/story-07.jpeg"),
  },
  {
    type: "image",
    title: "The Smile",
    caption: "The kind of picture that already feels like a throwback.",
    src: assetPath("birthday-media/story-08.jpeg"),
  },
  {
    type: "image",
    title: "On The Way",
    caption: "Some journeys matter because of who is standing there.",
    src: assetPath("birthday-media/story-09.jpeg"),
  },
  {
    type: "image",
    title: "Full Frame",
    caption: "One more frame for the wall of memories.",
    src: assetPath("birthday-media/story-10.jpeg"),
  },
];

const bestFriendMemories: MemoryItem[] = [
  {
    type: "image",
    title: "First Frame",
    caption: "The kind of smile that makes a memory feel warm.",
    src: assetPath("birthday-media/best-friend/solo-01.jpeg"),
  },
  {
    type: "image",
    title: "Everyday Cool",
    caption: "Simple days, easy laughter, and a familiar presence.",
    src: assetPath("birthday-media/best-friend/solo-02.jpeg"),
  },
  {
    type: "image",
    title: "Sharp Moment",
    caption: "One clean frame for the birthday story.",
    src: assetPath("birthday-media/best-friend/solo-03.jpeg"),
  },
  {
    type: "image",
    title: "Campus Energy",
    caption: "The kind of photo that already feels like a throwback.",
    src: assetPath("birthday-media/best-friend/solo-04.jpeg"),
  },
  {
    type: "image",
    title: "Night Lights",
    caption: "Some memories glow because of the person in them.",
    src: assetPath("birthday-media/best-friend/solo-05.jpeg"),
  },
  {
    type: "image",
    title: "Soft Frame",
    caption: "A calm frame for a friendship worth keeping.",
    src: assetPath("birthday-media/best-friend/solo-06.jpeg"),
  },
];

export const storyConfigs: Record<StoryKey, StoryConfig> = {
  brother: {
    route: "/",
    birthday: {
      name: "Bro",
      month: "July",
      day: 4,
      year: 2026,
      from: "Your brother",
    },
    audio: {
      backgroundSrc: "",
    },
    images: sharedImages,
    intro: ["Every person has a story...", "This one began in college."],
    memories: sharedMemories,
    scenes: [
      {
        type: "image",
        label: "College",
        align: "left",
        image: "college",
        title: "It all started here.",
        lines: [
          ["Among hundreds of faces...", "there was one I never imagined", "would become one of the most important people in my life."],
        ],
      },
      {
        type: "image",
        label: "Stranger",
        align: "right",
        eyebrow: "A Stranger",
        image: "stranger",
        title: "A Stranger",
        lines: [["Just another person", "walking through the same campus."], ["Nothing more."]],
      },
      {
        type: "image",
        label: "Known",
        align: "left",
        image: "familiar",
        title: "Someone I Knew",
        lines: [["You slowly became", "a familiar face."], ["A familiar smile."], ["Someone I started noticing."]],
      },
      {
        type: "conversation",
        label: "Conversation",
        eyebrow: "One Conversation",
        lines: ["Funny how", "one conversation", "can change everything."],
        messages: ["Hey.", "You coming?", "Of course.", "That changed everything."],
      },
      {
        type: "image",
        label: "Trust",
        align: "right",
        image: "trusted",
        title: "Someone I Trusted",
        lines: [["You became", "someone I could rely on."], ["Someone I could always count on."]],
      },
      {
        type: "gallery",
        label: "Memories",
        eyebrow: "Many Memories",
        title: "Little frames. Big proof.",
      },
      {
        type: "image",
        label: "Losing",
        align: "center",
        image: "losing",
        title: "Someone I Couldn't Imagine Losing",
        lines: [["Without realizing it..."], ["you became", "someone I couldn't imagine", "my life without."]],
      },
      {
        type: "text",
        label: "Brother",
        title: "Unbreakable Bond",
        lines: ["People say...", "Family is by blood.", "Life proved otherwise.", "You became...", "My Brother."],
      },
    ],
    final: {
      blackoutLines: ["This story...", "...was never just about you.", "It was always about us."],
      heading: "Happy Birthday",
      title: "My Brother ❤️",
      bodyLines: [
        "From strangers...",
        "to someone I knew...",
        "to one conversation...",
        "to someone I trusted...",
        "to countless memories...",
        "to my brother from another mother.",
      ],
      imageAlt: "Final memory together",
      small: "Thank you for choosing to stay in my life.",
    },
  },
  bestFriend: {
    route: "/best-friend",
    birthday: {
      name: "Best Friend",
      month: "July",
      day: 7,
      year: 2026,
      from: "Your friend",
    },
    audio: {
      backgroundSrc: "",
    },
    images: bestFriendImages,
    intro: [
      "Every friendship has a story.",
      "Some stories begin with a grand moment.",
      "Ours didn't.",
      "It began so quietly that neither of us realized we were starting something that would become one of the most beautiful chapters of our lives.",
      "Looking back now, it's amazing how life works.",
      "One unexpected meeting...",
      "One simple conversation...",
      "And a lifetime of memories waiting to happen."
    ],
    memories: bestFriendMemories,
    scenes: [
      {
        type: "image",
        label: "Strangers",
        align: "right",
        eyebrow: "Strangers",
        image: "college",
        title: "Strangers",
        lines: [
          ["At first...", "You were just another face in the crowd.", "Someone passing through the same college corridors.", "Someone I never imagined would one day become such an important part of my life."],
          ["We had our own worlds.", "Our own routines.", "Our own friends."],
          ["We were simply strangers.", "And somehow...", "Life had other plans."]
        ],
      },
      {
        type: "image",
        label: "Classmates",
        align: "left",
        eyebrow: "Classmates",
        image: "stranger",
        title: "Classmates",
        lines: [
          ["Then we became classmates.", "We attended the same lectures.", "Sat in the same classrooms.", "Walked through the same campus."],
          ["Without realizing it, we started recognizing each other.", "A smile.", "A wave.", "A casual conversation."],
          ["Sometimes, that's all destiny needs."]
        ],
      },
      {
        type: "conversation",
        label: "Conversation",
        eyebrow: "One Conversation",
        lines: [
          "People often think life changes because of big moments.",
          "But sometimes...",
          "Everything changes because of one simple conversation.",
          "A conversation that lasted a few minutes.",
          "Yet somehow created a friendship that has lasted for years.",
          "If someone had told me that day that we'd become best friends...",
          "I probably wouldn't have believed them."
        ],
        messages: ["Hey.", "You coming?", "Of course.", "That changed everything."],
      },
      {
        type: "image",
        label: "Friends",
        align: "left",
        image: "familiar",
        title: "Friends",
        lines: [
          ["Days turned into weeks.", "Weeks turned into months."],
          ["Conversations became laughter.", "Laughter became memories.", "College became more enjoyable because you were part of it."],
          ["Some of the best moments weren't planned.", "They simply happened...", "And somehow became unforgettable."]
        ],
      },
      {
        type: "text",
        label: "Memories",
        title: "Many Memories",
        lines: [
          "Every photo tells a story.",
          "Every story brings back a smile.",
          "Some memories make us laugh.",
          "Some make us emotional.",
          "Some remind us how much we've grown together.",
          "No matter how many years pass...",
          "These moments will always stay close to my heart."
        ],
      },
      {
        type: "image",
        label: "Best Friends",
        align: "right",
        image: "trusted",
        title: "Best Friends",
        lines: [
          ["At some point...", "You stopped being just another friend."],
          ["You became the person I could always count on.", "The one who understood me without explanations.", "The one who celebrated my happiness.", "The one who stood beside me during difficult times."],
          ["That's when I realized...", "Friendship had become something much deeper."]
        ],
      },
      {
        type: "text",
        label: "Friend For Life",
        title: "Friend For Life",
        lines: [
          "People say friendships change with time.",
          "Maybe some do.",
          "But some friendships only grow stronger.",
          "Distance may change.",
          "Life may become busy.",
          "Responsibilities may increase.",
          "But true friendships never fade.",
          "They simply become stronger with every passing year."
        ],
      },
    ],
    final: {
      blackoutLines: [
        "Thank you...",
        "For every conversation.",
        "For every laugh.",
        "For every memory.",
        "For always being there."
      ],
      heading: "Happy Birthday!",
      title: "My Friend For Life ❤️",
      bodyLines: [
        "Thank you for becoming one of the most beautiful parts of my life.",
        "Happy Birthday to the person who started as a stranger...",
        "Became my classmate...",
        "Turned into my friend...",
        "Became my best friend...",
        "And will always remain...",
        "My Friend For Life."
      ],
      imageAlt: "Final photo together",
      small: "No matter where life takes us, I hope we always have stories to tell, memories to cherish, and reasons to smile. Happy Birthday! 🎉",
      align: "right",
    },
  },
};

export const getStoryKeyFromPath = (pathname: string): StoryKey =>
  pathname.includes("/best-friend") ? "bestFriend" : "brother";
