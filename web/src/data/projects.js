import JamesMaddenPostUrl from './posts/james_madden_site.md';
import WorldXPlorePostUrl from './posts/worldxplore.md';
import HomeworkManagerPostUrl from './posts/homework_manager.md';

/**
 * List of posts to be shown in the website, plus URLs for their images and data
 */
const projects = [
  {
    title: "James Madden Website",
    img: "./assets/james_madden.png",
    bio: "Plasma background using WGPU",
    tags: ['Web', 'Rust', 'WebGPU'],
    post: JamesMaddenPostUrl
  },
  {
    title: "WorldXPlore",
    img: "./assets/worldxplore.png",
    bio: "Randomly generated game built with WGPU",
    tags: ['Rust', 'WebGPU', 'Game'],
    post: WorldXPlorePostUrl
  },
  {
    title: "Homework Manager",
    img: "./assets/homework_app.png",
    bio: "Firebase-powered PWA built for managing homework",
    tags: ['Web', 'PWA', 'Firebase'],
    post: HomeworkManagerPostUrl
  }
];

export default projects;