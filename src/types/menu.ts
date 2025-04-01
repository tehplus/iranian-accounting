export interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: keyof typeof import('../components/layout/menuIcons').menuIcons;
  children?: MenuItem[];
}

export interface MenuState {
  openMenus: string[];
  currentPath: string;
}