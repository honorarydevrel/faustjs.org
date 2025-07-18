# Chat Components

This directory contains the chat components for the Faust.js website AI assistant.

## Components

### `chat.jsx`

Main chat container component that handles the overall chat layout and form submission.

### `chat-dialog.jsx`

Dialog component that wraps the chat interface with a toggle for thinking steps.

### `messages.jsx`

Component that renders individual messages, including thinking steps from the AI.

### `chat-input.jsx`

Input component for user messages.

### `chat-button.jsx`

Button component to open the chat dialog.

### `chat-link.jsx`

Component for rendering links within chat messages.

### `state.jsx`

State management for the chat dialog.

## Thinking Feature

The chat now supports displaying AI thinking steps, which show the reasoning process before the final response.

### Features

- **Thinking Steps Display**: Shows the AI's reasoning process in a visually distinct section
- **Toggle Control**: Users can show/hide thinking steps using the eye icon in the chat dialog
- **Styling**: Thinking steps are styled with a purple theme and include emoji indicators
- **Animation**: Smooth fade-in animation for thinking sections

### Implementation

The thinking feature is implemented using the AI SDK's `experimental_streamThinking` option:

1. **API Route** (`src/app/api/chat/route.js`): Enables thinking streaming with `experimental_streamThinking: true`
2. **Messages Component**: Renders thinking steps when available and `showThinking` is true
3. **Chat Dialog**: Provides a toggle button to control thinking step visibility
4. **CSS**: Custom styles for the thinking section with animations and visual indicators

### Usage

Thinking steps are automatically included in AI responses when the feature is enabled. Users can:

- Click the eye icon to toggle thinking step visibility
- See the AI's reasoning process in real-time
- Understand how the AI arrives at its conclusions

### Styling

The thinking section uses:

- Purple background (`bg-purple-800/50`)
- Purple border accent (`border-purple-400`)
- Thinking emoji indicator (`🤔`)
- Individual thought indicators (`💭`)
- Smooth fade-in animation
