import React, { useEffect } from "react";

function ShowPosts(props) {
  console.log("This is: " + props);
  return (
    <div>
      <h1>Hello to ShowPosts!!!</h1>
    </div>
  );
  //     <div class="ui main text container segment">
  //     <div class="ui huge header"><%= blog.title %></div>
  //     <div class="ui top attached">
  //         <div class="item">
  //             <img  class="ui centered rounded image"src="<%= blog.image %>" >
  //             <div class="content">
  //                 <span><%= blog.created.toDateString() %></span>
  //             </div>
  //             <div class="description">
  //                 <p><%- blog.body %></p>
  //             </div>
  //             <a class="ui orange basic button" href="/blogs/<%= blog._id %>/edit">Edit</a>
  //             <form id="delete" action="/blogs/<%= blog._id %>?_method=DELETE" method="POST">
  //                 <button class="ui red basic button">Delete</button>
  //             </form>
  //         </div>
  //     </div>
  // </div>
}

export default ShowPosts;
