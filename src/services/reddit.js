import api from "../utils/api";

//To fetch the post from the APIs - 
const fetchRedditPosts = async (after = "") => {
    const endpoint = after ? `/r/reactjs.json?after=${after}` : `/r/reactjs.json`;
    return api.get(endpoint)
        .then((res)=>{
            const children = res.data.data.children;
            const posts = children.map((child) => child.data);
            const after = res.data.data.after;
            return {posts, after, error:false};
        }).catch((err)=>{
            console.log("We have got an error" , err.message);
            return {posts:[], after:null, error:true}
        })
};

export default fetchRedditPosts;