
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/webmidi/',
    component: ComponentCreator('/webmidi/','70f'),
    exact: true
  },
  {
    path: '/webmidi/api/',
    component: ComponentCreator('/webmidi/api/','030'),
    exact: true
  },
  {
    path: '/webmidi/blog',
    component: ComponentCreator('/webmidi/blog','e91'),
    exact: true
  },
  {
    path: '/webmidi/blog/hello-world',
    component: ComponentCreator('/webmidi/blog/hello-world','b95'),
    exact: true
  },
  {
    path: '/webmidi/blog/hola',
    component: ComponentCreator('/webmidi/blog/hola','1cf'),
    exact: true
  },
  {
    path: '/webmidi/blog/tags',
    component: ComponentCreator('/webmidi/blog/tags','8a0'),
    exact: true
  },
  {
    path: '/webmidi/blog/tags/docusaurus',
    component: ComponentCreator('/webmidi/blog/tags/docusaurus','c78'),
    exact: true
  },
  {
    path: '/webmidi/blog/tags/facebook',
    component: ComponentCreator('/webmidi/blog/tags/facebook','44e'),
    exact: true
  },
  {
    path: '/webmidi/blog/tags/hello',
    component: ComponentCreator('/webmidi/blog/tags/hello','904'),
    exact: true
  },
  {
    path: '/webmidi/blog/tags/hola',
    component: ComponentCreator('/webmidi/blog/tags/hola','f9f'),
    exact: true
  },
  {
    path: '/webmidi/blog/welcome',
    component: ComponentCreator('/webmidi/blog/welcome','d0f'),
    exact: true
  },
  {
    path: '/webmidi/showcase/',
    component: ComponentCreator('/webmidi/showcase/','828'),
    exact: true
  },
  {
    path: '/webmidi/docs',
    component: ComponentCreator('/webmidi/docs','2bf'),
    routes: [
      {
        path: '/webmidi/docs/intro',
        component: ComponentCreator('/webmidi/docs/intro','311'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/congratulations','24b'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/create-a-blog-post','618'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/create-a-document','c36'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/create-a-page','85f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/deploy-your-site','49c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/webmidi/docs/tutorial-basics/markdown-features','33a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/webmidi/docs/tutorial-extras/manage-docs-versions','c60'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/webmidi/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/webmidi/docs/tutorial-extras/translate-your-site','168'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
