/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";

import "./prism.css";
import Prism from "prismjs";
import { PositionsType } from "./Alert/Message";
import {
  Text,
  Button,
  theme,
  Container,
  Navbar,
  Toolbar,
  IconButton,
  Tooltip
} from "sancho";
import toaster, { Position } from "./Alert";

const NarrowContainer = ({ children }: { children: React.ReactNode }) => (
  <div css={{ maxWidth: "42rem", margin: "0 auto" }}>{children}</div>
);

interface AppProps {}

export function App({  }: AppProps) {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <Global
        styles={{
          html: {
            backgroundAttachment: "fixed"
          },
          body: {
            margin: 0,
            padding: 0
          },
          'pre[class*="language-"]': {
            borderRadius: 0,
            [theme.breakpoints.md]: {
              borderRadius: theme.radii.md
            }
          },
          pre: {
            marginBottom: "1rem !important",
            marginLeft: "-1rem !important",
            marginRight: "-1rem !important"
          }
        }}
      />
      <Navbar position="static">
        <Toolbar>
          <Text variant="h5" gutter={false}>
            Toasted Notes
          </Text>
          <div css={{ marginLeft: "auto" }}>
            <Tooltip content="View on Github">
              <IconButton
                variant="ghost"
                component="a"
                css={{ marginLeft: theme.spaces.md }}
                color={theme.colors.text.muted}
                href="https://github.com/bmcmahen/sancho"
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 1024 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                      transform="scale(64)"
                      fill="#1B1F23"
                    />
                  </svg>
                }
                label="View on github"
              />
            </Tooltip>
          </div>
        </Toolbar>
      </Navbar>
      <div
        css={{
          position: "relative",
          background: "white"
        }}
      >
        <Container>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: `${theme.spaces.lg} 0`,
              [theme.breakpoints.md]: {
                paddingTop: "4rem",
                paddingBottom: "5rem"
              }
            }}
          >
            <Text variant="display3">
              Easy, flexible toast notifications for React
            </Text>
            <Text css={{ maxWidth: "38rem" }} variant="lead">
              Toasted notes provides completely configurable toast notifications
              for your React application and it uses an imperative API which
              makes it easy to invoke within error or event handlers.
            </Text>
            <Button
              intent="primary"
              css={{ marginTop: theme.spaces.lg }}
              size="lg"
              iconAfter="arrow-right"
              href="https://github.com/bmcmahen/toasted-notes"
              component="a"
            >
              Learn more on Github
            </Button>
          </div>
        </Container>
      </div>
      <div
        css={{
          position: "relative",
          backgroundColor: theme.colors.scales.gray[3]
          // backgroundImage: `url(${require("./images/blur-bright.jpg")})`,
          // backgroundSize: "cover"
        }}
      >
        <Divider />
        <Container>
          <NarrowContainer>
            <div
              css={{
                paddingTop: theme.spaces.xl,
                paddingBottom: theme.spaces.xl,
                [theme.breakpoints.md]: {
                  paddingTop: 0,
                  paddingBottom: "5rem"
                },
                marginTop: "2rem"
              }}
            >
              <Text variant="h3">Getting started</Text>
              <Text variant="paragraph">
                Install into your React project using Yarn or NPM.
              </Text>
              <pre>
                <code className="language-command-line">
                  yarn add toasted-notes
                </code>
              </pre>
              <Text variant="paragraph">
                And import the toast module and the recommended CSS files.
              </Text>

              <pre>
                <code className="language-javascript">
                  {`
import toast from 'toasted-notes' 
import 'toasted-notes/umd/main.css';

toast.notify('Hello world!')
                `}
                </code>
              </pre>
            </div>
          </NarrowContainer>
        </Container>
        <Divider
          fill={theme.colors.scales.gray[3]}
          css={{
            bottom: 0,
            fill: theme.colors.scales.gray[3],
            background: "white"
            // transform: "rotate(180deg)"
          }}
        />
      </div>
      <Container>
        <NarrowContainer>
          <div
            css={{ marginTop: theme.spaces.xl, marginBottom: theme.spaces.lg }}
          >
            <Text variant="h3">Examples</Text>
          </div>
          <Section
            title="Basic usage"
            subtitle="Invoke a toast using the notify method with a message to display to the user. By default, the notification will appear at the top for a duration of three seconds."
            code={`
toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
        `}
            example={() => {
              toaster.notify(
                "Irure est ea deserunt labore ullamco est nisi labore in."
              );
            }}
          />

          <Section
            title="Using different positions"
            subtitle="You can display notifications in different positions, including top-left, top, top-right, bottom-left, bottom, and bottom-right."
            code={`
['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].forEach(position => {
  toast.notify("Using position " + position, {
    position
  });
});
        `}
            example={() => {
              Object.values(Position).forEach(position => {
                const p = position as PositionsType;
                toaster.notify("Using position: " + position, {
                  position: p
                });
              });
            }}
          />

          <Section
            title="Without a user duration"
            subtitle="When the user duration is set to null, the notification will appear indefinitely until manually closed by the user."
            code={`
toast.notify("I will not disappear", {
  duration: null
});
        `}
            example={() => {
              toaster.notify("I will not disappear unless you tell me", {
                duration: null
              });
            }}
          />

          <Section
            title="Using a custom element"
            subtitle="You can supply a custom element to render in replacement of the standard string."
            code={`
toast.notify(
  <div>
    <h3>Custom react node</h3>
  </div>
);
        `}
            example={() => {
              toaster.notify(
                <div>
                  <h3>Custom react node</h3>
                </div>
              );
            }}
          />

          <Section
            title="Using a render callback"
            subtitle="Using a render callback allows you to tap into the close function."
            code={`
toast.notify(
  <div>
    <h3>Custom react node</h3>
  </div>
);
        `}
            example={() => {
              toaster.notify(
                <div>
                  <h3>Custom react node</h3>
                </div>
              );
            }}
          />
        </NarrowContainer>
      </Container>
    </div>
  );
}

interface SectionProps {
  code: string;
  subtitle?: string;
  title: string;
  example: () => void;
}

function Section({ subtitle, code, title, example }: SectionProps) {
  return (
    <section
      css={{
        position: "relative",
        maxWidth: "45rem",
        margin: "0 auto",
        marginBottom: theme.spaces.xl
      }}
    >
      <Text css={{ display: "inline-block" }} variant="h5">
        {title}
      </Text>{" "}
      <Button
        css={{ position: "absolute", bottom: "1rem", right: 0 }}
        size="sm"
        onClick={e => {
          e.preventDefault();
          example();
        }}
      >
        View example
      </Button>
      {subtitle && <Text variant="paragraph">{subtitle}</Text>}
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
    </section>
  );
}

function Divider({ fill, ...other }: any) {
  return (
    <div
      css={{
        // position: "absolute",
        display: "none",
        [theme.breakpoints.md]: {
          display: "block"
        },
        top: "calc(100% - 1px)",
        left: 0,
        width: "100%",
        height: "100px"
      }}
      aria-hidden
      {...other}
    >
      <svg
        id="slit"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          fill="#efeff9"
          id="slitPath2"
          d="M50 100 C49 80 47 0 40 0 L47 0 Z"
        />
        <path
          fill="#efeff9"
          id="slitPath3"
          d="M50 100 C51 80 53 0 60 0 L53 0 Z"
        />
        <path fill={fill || "white"} id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
      </svg>
    </div>
  );
}
