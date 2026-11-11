import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Boxes,
  Calculator,
  CircleDot,
  Compass,
  LayoutDashboard,
  Network,
  Orbit,
  Sigma,
} from 'lucide-react';

export type NavigationItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Learn', to: '/learn', icon: BookOpen },
  { label: 'Vector Playground', to: '/vector-playground', icon: Compass },
  { label: 'Matrix Playground', to: '/matrix-playground', icon: Boxes },
  { label: 'Linear Systems', to: '/linear-systems', icon: Network },
  { label: 'Vector Spaces', to: '/vector-spaces', icon: Sigma },
  { label: 'Orthogonality', to: '/orthogonality', icon: Orbit },
  { label: 'Practice', to: '/practice', icon: Calculator },
  { label: 'Progress', to: '/progress', icon: BarChart3 },
];

