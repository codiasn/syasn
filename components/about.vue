<template>
  <div>
    <section class="section-valuables">
      <h1 class="desc">
        <!-- <img
          src="https://cdn-icons-png.flaticon.com/256/8143/8143776.png"
          style="width: 88px; text-align: center"
        />
        <br /> -->
        <span class="font-mackinac">Nos valeurs</span>
      </h1>
      <div class="container">
        <div v-for="value in values" class="one">
          <h1>{{ (value as any).title }}</h1>
          <p>
            {{ (value as any).text }}
          </p>
        </div>
      </div>
    </section>

    <section v-for="(team, t) in direction" :key="t" class="section-3">
      <h1 class="desc font-mackinac">
        <span>{{ team.name }}</span>
      </h1>
      <div class="container">
        <div v-for="(person, p) in team.persons" :key="p" class="one">
          <img :src="person.photo" :alt="person.name" />
          <div class="contact ga-2 d-flex align-center">
            <nuxt-link
              v-for="(contact, c) in person.contacts"
              :key="c"
              class="text-dark"
              :href="contact"
              target="_blank"
            >
              <ui-svg :name="c" width="22" height="22" />
            </nuxt-link>
          </div>
          <div
            class="font-makinack text-h6 font-mackinac px-2"
            style="line-height: 1"
          >
            {{ person.name }}
          </div>
          <p class="text-body-2 px-2">
            {{ person.text }}
          </p>
        </div>
      </div>
    </section>

    <ui-team />

    <section class="section-ceo-text pt-10">
      <div class="container">
        <p class="text font-mackinac">
          Chez Codia, nous construisons des outils qui facilitent l'intégration
          numérique sur tout le continent. Et cela commence par la compréhension
          des nouvelles exigences utilisateurs. Nous produisons les meilleurs
          outils qui soient pour une meilleure expérience utilisateur.
        </p>

        <div class="ceo mt-2">
          <div class="ceo-photo">
            <img
              src="/images/mamadou-dia.png"
              alt="Mamadou DIA - CEO of Codia"
            />
          </div>
          <div class="font-mackinac" style="line-height: 1">
            <div class="ceo-name">Mamadou DIA</div>
            <div class="ceo-description mt-1">
              <span>CEO Codia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const direction = ref([
      {
        name: "La direction",
        persons: [
          {
            photo: "/images/mamadou-dia.png",
            name: "Mamadou DIA, CEO et Chef de produit",
            text: "Fondateur et CEO de Codia, expert en SIRH, Mamadou apporte une véritable valeur ajoutée aux clients grâce à son expertise dans le développement de solutions adaptées aux besoins spécifiques des entreprises. Il s'assure que chaque solution réponde aux exigences de performance et d'innovation.",
            contacts: {
              github: "https://www.github.com/domutala/",
              linkedin: "https://www.linkedin.com/in/domutala/",
            },
          },
          {
            photo: "/images/saliou-diop.png",
            name: "Saliou DIOP, Directeur marketing et commercial, cofondateur",
            text: "Saliou dirige l'équipe marketing de Codia, notamment le marketing produit, le marketing d'entreprise, la génération de demande et la croissance. Il a été Directeur Exécutif de African Management Service.",
            contacts: { linkedin: "https://www.linkedin.com/in/saliou-diop/" },
          },
          {
            photo: "/images/serigne-saer-dia.png",
            name: "Saër, Directeur de la production et cofondateur",
            text: "Saër dirige la recherche et le développement, notamment avec les équipes produit, ingénierie et conception. Il a travaillé chez Attijari Bank au Maroc et Acep Sénégal.",
            contacts: {
              linkedin: "https://www.linkedin.com/in/saer-dia-13a02a16a/",
            },
          },
          // {
          //   photo: '/images/abdoulaye-bar.png',
          //   name: 'Abdoulaye BAR, Directeur de la technologie',
          //   text: 'Au sein de Codia, Abdoulaye supervise le service ingénierie. Auparavant, il a dirigé le service étude et développement de Sapco Sénégal.',
          // },
        ],
      },
    ]);

    const values = [
      {
        title: "Innovation",
        text: "L'innovation est importante pour nous. Nous cherchons à répondre aux besoins actuels pour créer une valeur durable.",
      },
      {
        title: "Qualité",
        text: "Nous nous engageons à offrir des solutions efficaces et fiables, en maintenant des standards élevés dans nos activités.",
      },
      {
        title: "Conformité",
        text: "Nous croyons qu'un bon travail repose sur des principes d'éthique. Nous respectons les normes de protection des données pour assurer la sécurité des informations de nos clients.",
      },
    ];

    const teams = [
      {
        name: "Ingénierie",
        icon: "022",
        text: "Nous construisons des outils qui permettent aux entreprise de se connecter facilement avec leurs clients 24h/24.",
      },
      {
        name: "Marketing et stratégie commerciales",
        icon: "021",
        text: "Nous nous concentrons sur le renforcement de la notoriété de la marque et la génération de la demande de nos clients.",
      },
      {
        name: "Recherche et conception de produits",
        icon: "024",
        text: "Nous travaillons pour mieux comprendre les besoins actuels et conceptualiser des produits en réponse à  ces besoins",
      },
      {
        name: "Juridique",
        icon: "026",
        text: "Nous assurons la conformité de nos produits aux lois et règlements en vigueures.",
      },
      {
        name: "Finances ",
        icon: "023",
        text: "Nous sommes un groupe multidisciplinaire qui aide Codia à se développer pour répondre à nos ambitions.",
      },

      {
        name: "Support clientèle",
        icon: "025",
        text: "Nous sommes le lien entre les équipes de production et les clients.",
      },
    ];

    return { teams, values, direction };
  },
});
</script>

<style lang="scss" scoped>
.section-3 {
  margin-top: 80px;
  .desc {
    margin: auto;
    text-align: center;
    font-size: 36px;
  }
  .container {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 90%;
    max-width: 882px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    row-gap: 50px;
    column-gap: 0px;

    @media (max-width: 772px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 662px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .one {
      padding: 10px;
      transition: all 0.5s ease;
      display: block;
      text-decoration: none;
      position: relative;

      img {
        height: 160px;
        width: 100%;
        // background-color: rgb(254, 191, 255);
        // background-color: rgba(255, 219, 191, 0.386);
        background-color: rgb(var(--v-theme-on-background), 0.05);
        // background-color: rgb(156, 230, 255);
        margin-bottom: 15px;
        object-fit: contain;
        object-position: bottom center;
        border-radius: 0.6em;
      }

      .contact {
        position: absolute;
        top: 30px;
        right: 30px;
      }

      p,
      h1 {
        padding: 0;
        margin: 0;
      }

      h1 {
        font-size: 18px;
      }

      p {
        margin-top: 15px;
        font-size: 18px;
      }
    }
  }
}

.section-valuables {
  .desc {
    margin: auto;
    text-align: center;
    font-size: 36px;
  }
  .container {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 90%;
    max-width: 772px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 662px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .one {
      padding: 20px;
      transition: all 0.5s ease;
      text-decoration: none;
      background-color: rgb(0, 0, 0);
      color: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 0.6em;

      p,
      h1 {
        padding: 0;
        margin: 0;
      }

      h1 {
        font-size: 36px;
        margin-bottom: 20px;
      }

      p {
        font-size: 18px;
        // margin-top: auto;
      }
    }
  }
}

.section-ceo-text {
  .container {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 90%;
    max-width: 662px;
    text-align: center;

    .text {
      font-size: 18px;
    }

    .ceo {
      display: flex;
      align-items: center;
      text-align: left;
      width: max-content;
      margin: auto;

      .ceo-photo {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: rgb(var(--v-theme-on-background), 0.04);
        overflow: hidden;
        align-items: flex-end;
        display: flex;
        justify-content: center;
        margin-right: 10px;

        img {
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }

      .ceo-name {
        margin: auto;
        font-size: 20px;
        max-width: 400px;
        font-weight: bold;
      }

      .ceo-description {
        font-size: 13px;
        // span {
        //   background-color: #000;
        //   color: #fff;
        // }
      }
    }
  }
}

.team {
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 90%;
  max-width: 992px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 50px;
  column-gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 662px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .one {
    padding: 40px;
    transition: all 0.5s ease;
    text-decoration: none;
    background-color: rgb(var(--v-theme-on-background), 0.05);
    display: flex;
    flex-direction: column;

    .icon {
      margin-bottom: 10px;
    }

    p,
    h1 {
      padding: 0;
      margin: 0;
      line-height: 1;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-top: auto;
      line-height: 1.5;
    }
  }
}
</style>
