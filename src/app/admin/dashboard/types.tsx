export type UserType = {
    id: number
    name: string
    password: string
    email: string
    token: string
    username: string
    profilePicture: string
    userType: string
    decInit: string
    isActive: boolean
    isLoggedIn: boolean
    lastLogin: Date
    createdAt: Date
    updatedAt: Date
}

export type EventType = {
    id: number
    title: string
    description: string
    link: string
    image: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
}

export type Programming = {
    id: number
    programme: string
    startTime: string
    endTime: string | null
    weekday: string
    createdAt: Date
    updatedAt: Date
}

export type ArticleType = {
    id: number
    title: string
    content: string
    facebookLink: string | null
    twitterLink: string | null
    instagramLink: string | null
    image: string | null
    writer: string
    articleType: string
    date: string | null
    createdAt: Date
    updatedAt: Date
}

export type ArticlesTabsProps = {
    articles: {
      id: number;
      facebookLink: string | null;
      twitterLink: string | null;
      instagramLink: string | null;
      createdAt: Date;
      updatedAt: Date;
      articleType: string;
      date: string | null;
      image: string | null;
      title: string;
      content: string;
      writer: string;
    }[];
  };

export type ArticleVotesComments = {
    id: number
    title: string
    content: string
    link: string | null
    image: string | null
    writer: string
    createdAt: Date
    updatedAt: Date
    votes: {
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        article: number;
        vote: number | null;
    }[]
    comments: {
        id: number
        email: string
        comment: string
        article: number
        createdAt: Date
        updatedAt: Date
        replies: {
            id: number
            email: string
            article: number
            comment: number
            reply: string
            createdAt: Date
            updatedAt: Date
        }[]
    }[]
}

export type Comments = {
    id: number
    email: string
    comment: string
    article: number
    createdAt: Date
    updatedAt: Date
}

export type Votes = {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    article: number;
    vote: number | null;
}

export type EnrollmentType = {
    id: number
    courseId: number
    email: string
    createdAt: Date
    updatedAt: Date
}
export type subscriptionsType = {
    id: number
    email: string
    createdAt: Date
    updatedAt: Date
}
  
  export type messagesType = {
    id: number
    email: string
    message: string
    createdAt: Date
    updatedAt: Date
}
export type currencyType = {
    id: number
    code: string
    currency: string
    country: string
    country_code: string
    createdAt: Date
    updatedAt: Date
  }
  
  export type courseType = {
    id: number
    title: string
    description: string
    courseOutline: string
    image: string
    mentor: number
    startDate: Date
    endDate: Date
    currency: number
    amount: number
    createdAt: Date
    updatedAt: Date
  }
  export type ActivityType = {
    id: number
    user_id: number
    value: string
    createdAt: Date
    updatedAt: Date
  }