<template>
  <div :class="containerClass" @click="onWrapperClick">
    <LayoutTopbar @menu-toggle="onMenuToggle" />

    <transition name="layout-sidebar">
      <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
        <div class="layout-logo">
            <router-link to="/">
                <img alt="Logo" :src="logo" />
            </router-link>
        </div>
        <LayoutProfile />
        <LayoutMenu :model="menu" @menuitem-click="onMenuItemClick" />
      </div>

    </transition>

    <div class="layout-main">
			<router-view />
		</div>

  </div>
</template>

<script>
import LayoutTopbar from './components/layout/LayoutTopbar.vue';
import LayoutProfile from './components/layout/LayoutProfile.vue';
import LayoutMenu from './components/layout/LayoutMenu.vue'

export default {
  menuService: null,
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu : [
              {label: 'Welcome', icon: 'pi pi-fw pi-home', to: '/'},
              {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/Dashboard'},
              {
                  label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
                  items: [
                      {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.layoutMode = 'static' },
                      {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.layoutMode = 'overlay' }
                  ]
              },
              {
                  label: 'Menu Colors', icon: 'pi pi-fw pi-align-left', 
                  items: [
                      {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.layoutColorMode = 'dark' },
                      {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.layoutColorMode = 'light' }
                  ]
              },
      ],
    };
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;
      
      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          this.overlayMenuActive = !this.overlayMenuActive;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
          if (this.layoutMode === 'static')
              return !this.staticMenuInactive;
          else if (this.layoutMode === 'overlay')
              return this.overlayMenuActive;
          else
              return true;
      }
      else {
          return true;
      }
    },
    onSidebarClick() {
        this.menuClick = true;
    },
    onMenuItemClick(event) {
        if (event.item && !event.item.items) {
            this.overlayMenuActive = false;
            this.mobileMenuActive = false;
        }
    }, 
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive": this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active": this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive
        }
      ];
    },
    sidebarClass() {
      return ['layout-sidebar', {
          'layout-sidebar-dark': this.layoutColorMode === 'dark',
          'layout-sidebar-light': this.layoutColorMode === 'light'
      }];
    },
    logo() {
        return (this.layoutColorMode === 'dark') ? "assets/layout/images/logo-white.svg" : "assets/layout/images/logo.svg";
    }
  },
  components: {
    'LayoutTopbar': LayoutTopbar,
    'LayoutProfile': LayoutProfile,
    'LayoutMenu': LayoutMenu,
  }
};
</script>