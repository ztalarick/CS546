const collections = require('./collections.js');
const posts = collections.posts;
const mongo = require("mongodb");

let exportedMethods = {
  async read(id){
    if(id == null){
      throw "Bad input for ID.";
    }
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: mongo.ObjectId(id)});
    if(post === null){
      throw "No post with that ID.";
    }
    return post;

  },

  async create(title, author, content){
    if(title == null || typeof title != "string"){
      throw "bad title input";
    }
    if (content == null || typeof content != "string") {
      throw "bad content input";
    }
    if(author == null){
      throw "bad author input";
    }
    const postCollection = await posts();
    let newPost = {
      title: title,
      author: author,
      content: content
    };
    const insertInfo = await postCollection.insertOne(newPost);
    if(insertInfo.insertCount === 0){
      throw "Coulnd't add post";
    }
    const id = insertInfo.insertedId;
    const post = await this.read(id);
    return post;
  },

  async update(id, newTitle, newContent){
    if(id == null || typeof id != "string"){
      throw "bad ID input";
    }
    const postCollection = await posts();
    let current_post = await exportedMethods.read(id);
    let newPost = {};

    if(newTitle != null && newContent == null){
      newPost = {
        title: newTitle,
        author: current_post.author,
        content: current_post.content
      };
    }else if(newTitle == null && newContent != null){
      newPost = {
        title: current_post.title,
        author: current_post.author,
        content: newContent
      };
    }else{
      newPost = {
        title: newTitle,
        author: current_post.author,
        content: newContent
      };
    }

    const updateInfo = await postCollection.updateOne({ _id: mongo.ObjectId(id) }, { $set: newPost });
    if(updateInfo === 0){
      throw "Could not update post.";
    }
    return await exportedMethods.read(id);
  },

  async delete(id){
    if (id == null || typeof id != "string") {
      throw "Bad input for ID.";
    }

    const postCollection = await posts();

    let post = await exportedMethods.read(id);

    const deletionInfo = await postCollection.removeOne({_id: mongo.ObjectId(id)});
    if(deletionInfo === 0){
      throw "Error removing";
    }

    let result = {
      "deleted": true,
      "data": post
    };

    return result;
  },

  async removeAll(){
    const postCollection = await posts();
    const removeInfo = await postCollection.deleteMany({});
    return true;
  },

  async readAll(){
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    return postList;
  }
};

module.exports = exportedMethods;
