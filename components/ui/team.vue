<template>
  <section class="ui-team">
    <h1 class="text-center font-mackinac text-h4">
      <span>{{ $t(title) }}</span>
    </h1>

    <div class="team">
      <div v-for="(team, t) in teams" :key="t" class="one rounded-xl">
        <ui-svg
          :name="`other/${team.icon}`"
          width="48"
          height="48"
          class="icon"
        />

        <h1>{{ team.name }}</h1>
        <p>{{ team.text }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps({ title: { type: String, default: "ourTeams" } });

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
</script>

<style lang="scss" scoped>
.ui-team {
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
}
</style>
