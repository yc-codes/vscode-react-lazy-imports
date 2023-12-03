# React lazy import converter

Example

```tsx
import Component from '@components/example/Component';

// will be converted to 
const Component = React.lazy(() => import('@components/example/Component'));
```




# Change Log

<!-- All notable changes to the "reactjs-vscode-helper" extension will be documented in this file. -->

<!-- Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

## [v0.1.0] - 2023-12-03

- Initial release

### Added
- Can convert react default imports to React.lazy imports