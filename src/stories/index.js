import React from "react";
import { storiesOf } from "@storybook/react";
import toast, { Position } from "../Alert";
import "../styles.css";

storiesOf("Toasted-notes", module)
  .add("pointer-events", () => (
    <div>
      <button
        onClick={() => {
          toast.notify("hello world", { duration: null });
          toast.notify(() => {
            return (
              <div>
                <button onClick={() => alert("yup")}>
                  I should be able to click this
                </button>
              </div>
            );
          });
        }}
      >
        Try me
      </button>
      <span>
        Dolore eu excepteur pariatur anim. Non proident excepteur Lorem cillum
        aliqua do. Nulla laborum mollit quis enim velit cillum aliquip occaecat
        dolore commodo occaecat voluptate voluptate et. Nostrud est ex aliquip
        officia do dolore Lorem. Non veniam excepteur aute ullamco magna.
      </span>
    </div>
  ))
  .add("all directions", () => (
    <div>
      {Object.keys(Position).map(position => (
        <button
          onClick={() => {
            toast.notify(
              Array.from({ length: Math.floor(Math.random() + 1 * 10) })
                .fill(position)
                .join(", "),
              { duration: null, position }
            );
          }}
        >
          {position}
        </button>
      ))}
    </div>
  ));
