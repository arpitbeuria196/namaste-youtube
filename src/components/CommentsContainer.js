import React from "react";

const commentsData = [
  {
    name: "Arpit Beuria",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Arpit Beuria",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        name: "John Doe",
        text: "Great post! Really insightful.",
        replies: [],
      },
      {
        name: "Jane Smith",
        text: "Thanks for sharing this!",
        replies: [
          {
            name: "Sam Wilson",
            text: "I agree with Jane, this was helpful.",
            replies: [
              {
                name: "Emily Carter",
                text: "This is such a great resource. Thank you!",
                replies: [
                  {
                    name: "Tom Hardy",
                    text: "I appreciate the effort put into this.",
                    replies: [
                      {
                        name: "Alice Johnson",
                        text: "Really well-written and clear.",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Brian Clark",
                    text: "Thank you for the details.",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mike Davis",
    text: "This is an excellent write-up!",
    replies: [],
  },
  {
    name: "Anna Taylor",
    text: "Thanks for this. Really helped me.",
    replies: [],
  },
];

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex bg-gray-50 p-4 rounded-lg my-3 shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out">
      <img
        className="w-12 h-12 rounded-full border-2 border-blue-500"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="ml-4">
        <p className="font-semibold text-black">{name}</p>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ Comments }) => {
  return (
    <>
      {Comments.map((comment, index) => (
        <div key={index} className="ml-0 border-l-2 border-gray-200 pl-4">
          <Comment data={comment} />
          {comment.replies && comment.replies.length > 0 && (
            <CommentList Comments={comment.replies} />
          )}
        </div>
      ))}
    </>
  );
};

const CommentsContainer = () => {
  return (
    <div className="max-w-4xl mx-3 mt-4">
      <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">
        Comments
      </h1>
      <CommentList Comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
