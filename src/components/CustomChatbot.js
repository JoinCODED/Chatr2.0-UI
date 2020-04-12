import React from "react";
import ChatBot from "react-simple-chatbot";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";

function CustomChatbot(props) {
  const config = {
    width: "300px",
    height: "400px",
    floating: true,
  };

  const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#FF0000",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#32CD32",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c",
  };

  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to our shop",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please type your name?",
      trigger: "Waiting user input for name",
    },
    {
      id: "Waiting user input for name",
      user: true,
      trigger: "Asking options to eat",
    },
    {
      id: "Asking options to eat",
      message: "Hi {previousValue}, Glad to know you !!",
      trigger: "Ask how to help",
    },
    {
      id: "Ask how to help",
      message: "How can I help you?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        { value: 1, label: "Add Channel", trigger: "Add channel" },
        {
          value: 2,
          label: "Do you want me to tell you jokes ?",
          trigger: "jokes",
        },
        {
          value: 3,
          label: "Do you want me to recommend a channel for you ?",
          trigger: "recommend",
        },
        {
          value: 4,
          label: "Nothing ?",
          trigger: "Done",
        },
      ],
    },
    {
      id: "Add channel",
      component: <Link to="/createChannel">Add Channel</Link>,
      trigger: "options",
    },
    {
      id: "jokes",
      message: "The watermelon is 50% water, The other 50% is melon.",

      trigger: "options",
    },
    {
      id: "recommend",
      component: <Link to="/ChannelView/771/">Best Channel</Link>,
      trigger: "options",
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
}
export default CustomChatbot;
