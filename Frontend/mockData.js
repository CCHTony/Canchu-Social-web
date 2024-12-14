export const post = {
  id: 1,
  created_at: "2023-04-09 22:21:48",
  context: "動態動態動態動態動態動態動態動態",
  is_liked: true,
  like_count: 327,
  comment_count: 68,
  picture: "https://i.imgur.com/VTC742A.png",
  name: "PJ",
  comments: [
    {
      id: 1,
      created_at: "2023-04-10 23:21:10",
      content:
        "朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。",
      user: {
        id: "1",
        name: "PJ",
        picture: "https://i.imgur.com/VTC742A.png"
      }
    },
    {
      id: 2,
      created_at: "2023-04-10 23:21:10",
      content: "朋友的留言",
      user: {
        id: "1",
        name: "Mary Wang",
        picture: "https://i.imgur.com/xfA6pxv.jpeg"
      }
    }
  ]
};

export const posts = [
  {
    id: 1,
    created_at: "2023-04-09 22:21:48",
    context: "動態動態動態動態動態動態動態動態",
    is_liked: true,
    like_count: 327,
    comment_count: 68,
    picture: "https://i.imgur.com/VTC742A.png",
    name: "PJ"
  },
  {
    id: 2,
    created_at: "2023-05-09 22:21:48",
    context: "測試二號",
    is_liked: false,
    like_count: 0,
    comment_count: 1,
    picture: "https://i.imgur.com/VTC742A.png",
    name: "PJ"
  }
];

export const friends = [
  {
    id: 1,
    name: "PJ",
    picture: "https://i.imgur.com/VTC742A.png",
    friendship: {
      id: 1,
      status: "friend"
    }
  },
  {
    id: 2,
    name: "Mary",
    picture: "https://i.imgur.com/xfA6pxv.jpeg",
    friendship: {
      id: 2,
      status: "friend"
    }
  },
  {
    id: 3,
    name: "PJ",
    picture: "https://i.imgur.com/VTC742A.png",
    friendship: {
      id: 1,
      status: "friend"
    }
  },
  {
    id: 4,
    name: "Mary",
    picture: "https://i.imgur.com/xfA6pxv.jpeg",
    friendship: {
      id: 2,
      status: "friend"
    }
  },
  {
    id: 5,
    name: "PJ",
    picture: "https://i.imgur.com/VTC742A.png",
    friendship: {
      id: 1,
      status: "friend"
    }
  },
  {
    id: 6,
    name: "Mary",
    picture: "https://i.imgur.com/xfA6pxv.jpeg",
    friendship: {
      id: 2,
      status: "friend"
    }
  },
  {
    id: 7,
    name: "PJ",
    picture: "https://i.imgur.com/VTC742A.png",
    friendship: {
      id: 1,
      status: "friend"
    }
  },
  {
    id: 8,
    name: "Mary",
    picture: "https://i.imgur.com/xfA6pxv.jpeg",
    friendship: {
      id: 2,
      status: "friend"
    }
  }
];

export const user = {
  id: 12,
  name: "Chou Chou Hu",
  picture: "https://i.imgur.com/G4uBEJq.png",
  friend_count: 30,
  introduction: "自我介紹自我介紹自我介紹",
  friendship: {
    id: 1,
    status: "requested"
  },
  tags: "打籃球,打壘球,打東東"
};

export const events = [
  {
    id: 1,
    type: "friend_request",
    is_read: false,
    image: "https://schoolvoyage.ga/images/123498.png",
    created_at: "2023-03-23 23:10:21",
    summary: "王小明邀請你成為好友"
  },
  {
    id: 2,
    type: "friend_request",
    is_read: true,
    image: "https://schoolvoyage.ga/images/123498.png",
    created_at: "2023-03-23 23:10:21",
    summary: "王小明邀請你成為好友"
  }
];
