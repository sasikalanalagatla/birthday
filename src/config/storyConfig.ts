export type MemoryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
  title: string;
};

export type StoryConfig = {
  birthday: {
    name: string;
    month: string;
    day: number;
    year: number;
    from: string;
  };
  audio: {
    backgroundSrc: string;
  };
  images: {
    college: string;
    stranger: string;
    familiar: string;
    trusted: string;
    losing: string;
    finalTogether: string;
  };
  intro: string[];
  memories: MemoryItem[];
};

export const storyConfig: StoryConfig = {
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
  images: {
    college: "/birthday-media/story-03.jpeg",
    stranger: "/birthday-media/story-04.jpeg",
    familiar: "/birthday-media/story-08.jpeg",
    trusted: "/birthday-media/story-05.jpeg",
    losing: "/birthday-media/story-06.jpeg",
    finalTogether: "/birthday-media/story-02.jpeg",
  },
  intro: ["Every person has a story...", "This one began in college."],
  memories: [
    {
      type: "image",
      title: "Sunlit Frame",
      caption: "A moment that quietly became part of the story.",
      src: "/birthday-media/story-01.jpeg",
    },
    {
      type: "image",
      title: "Celebration Mode",
      caption: "The familiar face that started feeling like home.",
      src: "/birthday-media/story-02.jpeg",
    },
    {
      type: "image",
      title: "The Daylight",
      caption: "Countless ordinary days that turned into memories.",
      src: "/birthday-media/story-03.jpeg",
    },
    {
      type: "image",
      title: "The Close-Up",
      caption: "Proof that some people become family by choosing to stay.",
      src: "/birthday-media/story-04.jpeg",
    },
    {
      type: "image",
      title: "Cafe Pause",
      caption: "Some memories feel calm the moment you look back at them.",
      src: "/birthday-media/story-05.jpeg",
    },
    {
      type: "image",
      title: "Roadside Frame",
      caption: "A simple stop, a good photo, another page in the story.",
      src: "/birthday-media/story-06.jpeg",
    },
    {
      type: "image",
      title: "Another Angle",
      caption: "Same day, same presence, another memory saved.",
      src: "/birthday-media/story-07.jpeg",
    },
    {
      type: "image",
      title: "The Smile",
      caption: "The kind of picture that already feels like a throwback.",
      src: "/birthday-media/story-08.jpeg",
    },
    {
      type: "image",
      title: "On The Way",
      caption: "Some journeys matter because of who is standing there.",
      src: "/birthday-media/story-09.jpeg",
    },
    {
      type: "image",
      title: "Full Frame",
      caption: "One more frame for the wall of memories.",
      src: "/birthday-media/story-10.jpeg",
    },
  ],
};
