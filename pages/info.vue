<template>
  <div class="info-page">
    <div class="container">
      <div class="intro">
        <div class="bio">
          My name is Thomas Le Goff. I mainly work as a UI designer and visual development artist for media, fashion and games.
        </div>
        <div class="social-icons">
          <ul>
            <li class="social facebook">
              <a href="#facebook"/>
            </li>
            <li class="social twitter">
              <a href="#twitter"/>
            </li>
            <li class="social instagram">
              <a href="#instagram"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="projects">
        <div class="projects-container">
          <ul class="elements">
            <li>
              <div v-lazy:background-image="`info.jpg`" class="thumbnail"/>
              <div class="text">
                <h2 class="title font--stylized">UI Portofolio</h2>
                <div class="description">
                  An overview of the web and advertising projects I’ve worked on for agencies or in freelance, with a focus on corporate identity, branding, and typography.
                </div>
              </div>

            </li>
            <li>
              <div v-lazy:background-image="`info.jpg`" class="thumbnail"/>
              <div class="text">
                <h2 class="title font--stylized">Visdev Portofolio</h2>
                <div class="description">
                  An overview of the web and advertising projects I’ve worked on for agencies or in freelance, with a focus on corporate identity, branding, and typography.
                </div>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .info-page {
    background-image: url(~assets/gridblock.svg);
    background-repeat: repeat;
    background-position: 50% calc(0% + 40px);
    padding-top: calc(40px * 3);
  }

  .container {
    width: calc(79px * 9);
    margin: 0 auto;
    height: auto;
  }

  .intro {
    height: calc(79px * 4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bio {
      height: calc(80px * 2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 29px;
      margin-left: calc(79px * 2);
    }

    .social-icons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 79px;
      margin-left: calc(79px * 2);

      ul {
        height: auto;
        padding: 4px;

        .social {
          display: inline-block;
          height: 25px;
          width: 25px;
          background-position: center;
          background-size: 100%;
          position: relative;
          
          &:not(:first-of-type) {margin-left: 54px};
          &.facebook { background-image: url(~assets/social-icons/facebook.svg) }
          &.twitter { background-image: url(~assets/social-icons/twitter.svg) }
          &.instagram { background-image: url(~assets/social-icons/instagram.svg) }

          a {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .projects {
    overflow: hidden;

    .projects-container > ul > li {
      margin: 79px 0;
      position: relative;
      height: calc(79px * 3 - 1px);
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-size: 24px;
      padding-top: calc(79px - 1em);
      cursor: pointer;
    }

    .thumbnail {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      width: calc(79px * 3 - 1px);
      transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
      background-size: 100%;
      background-position: center;
      transform: translateX(-100%);
      opacity: .7;
    }

    li:hover .thumbnail {opacity: 1;}

    .text {
      margin-left: calc(79px * 2 - 1px);
      .title {
        font-size: 24px;
        margin-bottom: 27px;
      }

      .description {
        font-size: initial;
      }
    }



  }

  .thumbnail[lazy=loading] {
    transform: translateX(-100%)
  }
  .thumbnail[lazy=error] {
    /*your style here*/
    transform: translateX(100%)
  }
  .thumbnail[lazy=loaded] {
    transform: translateX(0%)
  }
</style>
