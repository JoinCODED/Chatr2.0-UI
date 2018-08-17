import React from "react";
import { decorate, observable, computed } from "mobx";
import axios from "axios";
import authStore from "./authStore";

const instance = axios.create({
  baseURL: "http://192.168.100.54"
});

class ChannelStore {
  constructor() {
    this.channels = [];
    this.messages = [];
    this.loading = true;
    this.getChannels();
  }

  getChannels() {
    instance
      .get(`/channels/`, authStore.token)
      .then(response => response.data)
      .then(channels => {
        this.channels = channels;
        this.loading = false;
      })
      .catch(err => console.log(err));
  }

  getMessage(curretChannelId) {
    instance
      .get(`/channels/${curretChannelId}/`, authStore.token)
      .then(response => response.data)
      .then(messages => {
        console.log("huehue");
        this.messages = messages;
      })
      .catch(err => console.log(err));
  }

  createChannel(name) {
    let data = {
      name: name
    };
    console.log(data);
    instance
      .post(`/channels/create/`, data)
      .then(response => response.data)
      .then(channel => {
        this.channels.push(channel);
        alert("Channel Created Succesfully" + channel.name);
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }

  createMessage(message, channelID) {
    let data = {
      message: message
    };
    instance
      .post(`/channels/${channelID}/send/`, data)
      .then(response => response.data)
      .then(message => {
        this.channels.push(message);
        alert("Message Created Succesfully" + message.message);
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }
}

decorate(ChannelStore, {
  channels: observable,
  messages: observable,
  loading: observable
});

export default new ChannelStore();
