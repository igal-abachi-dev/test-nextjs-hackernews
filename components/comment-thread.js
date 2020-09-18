import { Link } from "../routes";

function commentThread(comments) {
  const thread = [];

  comments.map(({ id, level, user, time_ago, content, comments }) => {
    thread.push(
      <div
        key={id}
        style={{ marginLeft: `${level * 2}0px` }}
        className="bb b--black-10 mb3"
      >
        <li>
          <span className="mt3 f6 fw3 mb0 black-60">
            <Link route="user" params={{ name: user || "pg" }}>
              <a className="link grow black-60">{user}</a>
            </Link>
            {" "}
            {time_ago}
          </span>
          <div
            className="f5 lh-copy black mb2 mt1"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </li>
        <style global jsx>
          {
            `
          p {
            margin-top: 0;
            overflow-x: hidden;
          }
          p a, p a:visited {
            opacity: 1;
            padding: .4em .2em .4em .2em;
            text-decoration: none;
            transition: color .15s ease-in;
          }
          p a:focus {
            outline: 1px dotted currentColor;
          }
          p a:hover, p a:focus {
            opacity: .5;
            transition: opacity .15s ease-in;
          }
          pre {
            overflow-x: hidden;
          }
        `
          }
        </style>
      </div>
    );

    if (comments && comments.length) {
      thread.push(commentThread(comments));
    }
  });

  return thread;
}

export default ({ comments }) => {
  const userComments = commentThread(comments);
  return (
    <ul className="list pl2 pl3-ns mr3">
      {userComments.length
        ? userComments
        : <div className="f4 fw3 tc pv5">No comments.</div>}
    </ul>
  );
};
