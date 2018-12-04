import React, { Component } from 'react';

export default function TrendingTag(props) {
    const taglist = ["react", "reactjs", "javascript", "blockchain", "decentralize", "social network"]
    const count = ["12345", "2345", "345", "45", "11", "1"]
    return <div className="right">
        <div className="trendingtag">
            Trending tags
        </div>
        <div className="trendingtags">
            <ul className="taglist">
                {taglist.map((tag, index) => {
                    return <li className="item" key={index}>
                        <div className="tagtext">{tag}</div>
                        <div className="count"> {count[index]}</div>
                    </li>
                })}

            </ul>
        </div>
    </div>
}