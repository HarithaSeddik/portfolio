import type { ExperienceEntry } from './types';

export const experienceEntries: ExperienceEntry[] = [
  {
    dateRange: '2021 – Present',
    role: 'Mobile Developer',
    company: 'Kobil GmbH',
    body: "Turkey's first SuperApp. 10M+ users. Flutter, Firebase, GitLab CI/CD, BLOC state management, and native MethodChannel integrations. Scale where a bug in production is a very bad morning.",
    tags: ['Flutter', 'Firebase', 'CI/CD', 'BLOC'],
  },
  {
    dateRange: '2020 – 2021',
    role: 'R&D Engineer',
    company: 'Enekom Energy',
    body: "Python test tools for hardware devices, RaspberryPi test platforms, Ubuntu server remote testing. The kind of engineering where nothing is documented and you figure it out anyway.",
    tags: ['Python', 'Linux', 'RPi', 'SQLite'],
  },
  {
    dateRange: '2019 – 2020',
    role: 'Project Lead',
    company: 'Hunter Drone Platform',
    body: "Built a drone that hunts other drones. Object detection on Jetson NANO with OpenCV, camera gimbal stabilization. Sponsored by Meteksan Defence. It flew. We were shocked.",
    tags: ['Python', 'OpenCV', 'C', 'Jetson NANO'],
  },
];
