const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const wave1 = [
  {
    "id": "ATMA_VIJÑANA",
    "title": "The Science of the Self",
    "description": "Focuses on the ontological nature of the soul, consciousness, and the distinction between matter and spirit.",
    "keywords": ["soul", "consciousness", "atma", "spirit", "immortality", "existence"],
    "subtags": [
      { "id": "soul_immortality", "sanskrit": "Akṣara", "description": "The indestructible, eternal nature of the Self that survives the destruction of the physical body.", "keywords": ["immortality", "eternal", "indestructible", "deathless"], "examples": ["Understanding the soul cannot be cut, burned, or withered", "Recognizing the Self as unborn and primeval", "Distinguishing the changing body from the changeless inhabitant"], "related_tags": ["beyond_duality", "identification_error", "liberation_states"] },
      { "id": "reincarnation_cycles", "sanskrit": "Dehāntara-prāpti", "description": "The technical mechanics of the soul transferring from one body to another, similar to changing clothes.", "keywords": ["reincarnation", "rebirth", "cycle", "transition"], "examples": ["The soul passing from childhood to youth to old age", "Attaining a new body based on past mental states", "Understanding the travel of the individual jiva"], "related_tags": ["final_consciousness", "karma_yoga", "death_and_modes"] },
      { "id": "individual_vs_universal", "sanskrit": "Jīva vs. Īśvara", "description": "The relationship between the individual spark of consciousness and the Supreme Source.", "keywords": ["god", "soul", "oneness", "relationship", "difference"], "examples": ["Understanding the jiva as a fragment of the Divine", "The relationship between the part and the whole", "Realizing the shared quality of spirit between man and God"], "related_tags": ["super_soul_presence", "oneness_vision", "bhakti_yoga"] },
      { "id": "witness_consciousness", "sanskrit": "Sākṣī", "description": "The state of the Self acting as a detached observer of the mind and body's activities.", "keywords": ["observer", "witness", "detachment", "awareness"], "examples": ["Observing thoughts without getting entangled", "Recognizing the gunas are acting, not the Self", "Achieving the state of the non-doer"], "related_tags": ["agency_analysis", "stability_of_mind", "detached_action"] },
      { "id": "identification_error", "sanskrit": "Adhyāsa", "description": "The fundamental delusion of misidentifying the eternal Self with the temporary material body and its labels.", "keywords": ["ego", "delusion", "misidentification", "false identity"], "examples": ["Thinking 'I am this body' or 'I am this name'", "Entanglement in bodily designations like race or status", "Overcoming the ahankara (false ego)"], "related_tags": ["atma_vijnana", "illusion_and_maya", "beyond_duality"] }
    ]
  },
  {
    "id": "KARMA_YOGA",
    "title": "The Art of Action",
    "description": "Focuses on the performance of duty and professional work without psychological bondage or selfish attachment.",
    "keywords": ["action", "duty", "work", "karma", "detachment", "ethics"],
    "subtags": [
      { "id": "detached_action", "sanskrit": "Niṣkāma-karma", "description": "Acting with excellence and commitment but remaining unattached to the personal fruit or result.", "keywords": ["detachment", "results", "work ethic", "freedom"], "examples": ["Focusing on the process rather than the profit", "Working for the sake of duty alone", "Remaining neutral toward success or failure"], "related_tags": ["result_equanimity", "renunciation_of_fruit", "skilled_performance"] },
      { "id": "prescribed_duty", "sanskrit": "Svadharma", "description": "Identifying and executing one's unique social, moral, and professional role in the world.", "keywords": ["vocation", "duty", "calling", "responsibility"], "examples": ["Performing one's own work, even if imperfectly", "Aligning work with one's natural psychophysical nature", "Rejecting another's duty despite its apparent ease"], "related_tags": ["varna_system", "dharma_and_krti", "social_leadership"] },
      { "id": "agency_analysis", "sanskrit": "Kartṛtva", "description": "Analyzing who the actual 'doer' is—the soul, the senses, or the material modes (Gunas).", "keywords": ["doer", "agency", "control", "responsibility"], "examples": ["Understanding how nature performs all actions", "Recognizing the five factors of action", "Freeing oneself from the conceit of being the sole doer"], "related_tags": ["witness_consciousness", "guna_interaction", "action_in_inaction"] },
      { "id": "sacrifice_logic", "sanskrit": "Yajña", "description": "Transforming daily labor and sensory inputs into a sacred offering for the universal good.", "keywords": ["sacrifice", "offering", "sacred work", "devotion"], "examples": ["Working for the satisfaction of the Divine", "Sharing the fruits of labor with the community", "Turning daily routine into a spiritual ritual"], "related_tags": ["bhakti_yoga", "loka_sangraha", "divine_sustenance"] },
      { "id": "skilled_performance", "sanskrit": "Yogaḥ karmasu kauśalam", "description": "The definition of Yoga as 'excellence in action'—performing work with precision and focus.", "keywords": ["skill", "excellence", "focus", "mastery"], "examples": ["Achieving flow-state in professional work", "Eliminating mental distractions during tasks", "Using work as a tool for meditative focus"], "related_tags": ["resolute_intelligence", "karma_yoga", "mental_focus"] }
    ]
  },
  {
    "id": "JÑANA_YOGA",
    "title": "The Path of Knowledge",
    "description": "Focuses on intellectual discrimination, philosophical insight, and the destruction of ignorance.",
    "keywords": ["knowledge", "wisdom", "intellect", "truth", "philosophy"],
    "subtags": [
      { "id": "analytical_discrimination", "sanskrit": "Sāṅkhya", "description": "The systematic categorization of the elements of reality to differentiate the Self from the material world.", "keywords": ["analysis", "logic", "categorization", "elements"], "examples": ["Distinguishing the 24 elements of material nature", "Separating the observer from the observed", "Analyzing the interaction of the gunas"], "related_tags": ["ksetra_vs_ksetrajna", "jñana_yoga", "primordial_nature"] },
      { "id": "burning_of_karma", "sanskrit": "Jñānāgni", "description": "The concept of knowledge acting as a fire that burns away the reactions of past actions and mental bondage.", "keywords": ["purification", "karma", "fire", "liberation"], "examples": ["Dissolving the seeds of desire through wisdom", "Ending the cycle of reactions through insight", "Cleansing the intellect through truth"], "related_tags": ["transcendental_knowledge", "phala_and_mukti", "freedom_from_doubt"] },
      { "id": "guru_parampara", "sanskrit": "Paramparā", "description": "The science of receiving knowledge through an unbroken disciplic succession and a living teacher.", "keywords": ["teacher", "lineage", "succession", "authority"], "examples": ["Understanding the history of the Gītā's transmission", "The necessity of a realized guide", "Maintaining the purity of traditional wisdom"], "related_tags": ["intellectual_surrender", "standard_of_authority", "truth_realization"] },
      { "id": "illusion_and_maya", "sanskrit": "Māyā", "description": "The study of the Divine energy that covers the true nature of reality with temporary appearances.", "keywords": ["illusion", "veil", "mirage", "material energy"], "examples": ["Seeing the world as a temporary reflection", "Overcoming the difficulty of the 'divine energy'", "Understanding the covering and throwing powers of Maya"], "related_tags": ["identification_error", "guna_interaction", "skepticism_and_proof"] },
      { "id": "oneness_vision", "sanskrit": "Ekatvam", "description": "The realization of the shared spiritual spark in all living beings, from the sage to the humble animal.", "keywords": ["equality", "unity", "vision", "compassion"], "examples": ["Seeing a brahmin, a dog, and an elephant with equal vision", "Recognizing the Divine in every heart", "Breaking through social and physical barriers via spirit"], "related_tags": ["universal_friendship", "bhakti_yoga", "freedom_from_malice"] }
    ]
  },
  {
    "id": "BHAKTI_YOGA",
    "title": "The Path of Devotion",
    "description": "Focuses on the emotional, personal, and loving relationship between the individual and the Supreme Person.",
    "keywords": ["devotion", "love", "surrender", "relationship", "theism"],
    "subtags": [
      { "id": "unalloyed_devotion", "sanskrit": "Ananya-bhakti", "description": "One-pointed, exclusive focus on the Divine without mixing in material desires or secondary goals.", "keywords": ["focus", "purity", "exclusivity", "dedication"], "examples": ["Engaging the mind constantly in the Divine", "Eliminating distractions in worship", "Achieving the state of total absorption"], "related_tags": ["mental_focus", "constant_remembrance", "top_most_yogi"] },
      { "id": "surrender_mechanics", "sanskrit": "Śaraṇāgati", "description": "The internal process of total surrender, involving faith, acceptance, and the abandonment of false independence.", "keywords": ["surrender", "faith", "refuge", "protection"], "examples": ["Accepting what is favorable for devotion", "Rejecting what is unfavorable", "Depending entirely on Divine protection"], "related_tags": ["divine_protection", "intellectual_surrender", "sarva_dharman_parityajya"] },
      { "id": "grace_and_mercy", "sanskrit": "Prasāda", "description": "The descent of Divine favor that allows a seeker to cross over the ocean of material struggle.", "keywords": ["grace", "mercy", "favor", "blessing"], "examples": ["Attaining peace through Divine kindness", "The clearing of mental fog via grace", "Receiving what cannot be earned by effort alone"], "related_tags": ["peace_pre_requisites", "divine_reciprocity", "the_safety_net_of_grace"] },
      { "id": "constant_remembrance", "sanskrit": "Smaraṇam", "description": "Cultivating a 24/7 awareness of the Divine presence in all activities and environments.", "keywords": ["memory", "awareness", "meditation", "remembrance"], "examples": ["Remembering God while working", "Thinking of the Divine at the moment of death", "Cultivating a steady stream of spiritual thought"], "related_tags": ["final_consciousness", "vibrant_remembrance", "inner_sanctuary"] },
      { "id": "types_of_devotees", "sanskrit": "Catur-vidhā-bhakta", "description": "The four categories of people who approach God: the distressed, the seeker of wealth, the inquisitive, and the wise.", "keywords": ["seekers", "types", "motivation", "intent"], "examples": ["Approaching God during personal crisis", "Seeking God to understand the truth", "The superiority of the wise devotee"], "related_tags": ["spiritual_thirst", "the_impure_motive", "jijnasu"] }
    ]
  }
]

const wave2 = [
  {
    "id": "SAṀŚAYA_AND_VIMOHA",
    "title": "Doubt and Delusion",
    "description": "Focuses on the cognitive distortions, emotional attachments, and intellectual clouding that prevent right action and clarity.",
    "keywords": ["doubt", "delusion", "confusion", "attachment", "ignorance", "maya"],
    "subtags": [
      { "id": "intellectual_inertia", "sanskrit": "Ajñāna", "description": "The clouding of discrimination where the intellect becomes unable to distinguish between the eternal and the temporary.", "keywords": ["ignorance", "blindness", "darkness", "confusion"], "examples": ["Lack of awareness regarding the soul's nature", "Intellectual laziness in pursuing Truth", "Being covered by the mode of ignorance"], "related_tags": ["tamas_mode", "cognitive_fog", "identification_error"] },
      { "id": "paralysis_of_will", "sanskrit": "Dharma-saṁmūḍha", "description": "The state of being overwhelmed by a crisis of duty, leading to the inability to make a decisive choice.", "keywords": ["paralysis", "indecision", "moral crisis", "stagnation"], "examples": ["Arjuna's collapse on the battlefield", "Conflict between personal emotion and social duty", "Inability to determine the correct path of Dharma"], "related_tags": ["moral_crisis", "false_compassion", "the_doubt_virus"] },
      { "id": "attachment_bias", "sanskrit": "Saṅga", "description": "Subtle mental clinging to specific outcomes, people, or objects that creates psychological bondage.", "keywords": ["attachment", "clinging", "bias", "bondage"], "examples": ["Attachment to family reputation over higher duty", "Clinging to the fruits of one's labor", "Emotional dependence on external validation"], "related_tags": ["detached_action", "bondage_mechanics", "delusion_of_ownership"] },
      { "id": "the_veil_of_maya", "sanskrit": "Yoga-māyā", "description": "The Divine energy that specifically hides the Truth from those who are not yet prepared to see it.", "keywords": ["illusion", "veil", "divine energy", "hidden truth"], "examples": ["The inability of the worldly-minded to see God", "The covering power of the material modes", "The paradox of the Divine being everywhere yet hidden"], "related_tags": ["the_hidden_god", "illusion_and_maya", "the_revelation"] }
    ]
  },
  {
    "id": "PRĀṆA_AND_DEHA",
    "title": "The Subtle and Gross Anatomy",
    "description": "Focuses on the biological, energetic, and metaphorical framework of the human machine as a vehicle for the soul.",
    "keywords": ["anatomy", "breath", "body", "senses", "energy", "vehicle"],
    "subtags": [
      { "id": "five_life_airs", "sanskrit": "Pañca-prāṇa", "description": "The five functional divisions of the life-force (Prana, Apana, Vyana, Udana, Samana) that maintain the body.", "keywords": ["breath", "vital force", "energy", "life air"], "examples": ["Balancing the incoming and outgoing breath", "The role of breath in steadying the mind", "The movement of energy during the yogic exit"], "related_tags": ["breath_regulation", "the_yogic_exit", "dhyana_yoga"] },
      { "id": "body_as_chariot", "sanskrit": "Ratha-rūpaka", "description": "The classic metaphor where the body is the chariot, the senses are horses, the mind is reins, and the intellect is the driver.", "keywords": ["metaphor", "chariot", "control", "self-management"], "examples": ["The intellect directing the mind and senses", "The soul as the passenger in the vehicle", "The danger of 'wild horses' (uncontrolled senses)"], "related_tags": ["sense_control", "resolute_intelligence", "buddhi_yoga"] },
      { "id": "seat_of_the_soul", "sanskrit": "Hṛd-deśe", "description": "The localized metaphysical and biological center in the heart where the individual soul and Super-soul reside.", "keywords": ["heart", "center", "residence", "soul"], "examples": ["The Lord residing in the hearts of all beings", "Focusing meditation on the heart center", "The source of remembrance and knowledge"], "related_tags": ["super_soul_presence", "internal_worship", "temple_of_the_heart"] },
      { "id": "physical_mortality", "sanskrit": "Vināśyati", "description": "The inevitable decay and destruction of the biological shell, contrasted with the eternal nature of the inhabitant.", "keywords": ["death", "decay", "mortality", "temporary"], "examples": ["The body being cast off like old clothes", "The inevitable end of all created things", "Overcoming the fear of physical destruction"], "related_tags": ["soul_immortality", "time_as_destruction", "reincarnation_cycles"] }
    ]
  },
  {
    "id": "ŚRADDHĀ_AND_BHĀVA",
    "title": "The Anatomy of Faith",
    "description": "Focuses on the internal conviction, emotional quality, and the sincerity of the seeker's heart.",
    "keywords": ["faith", "devotion", "mood", "sincerity", "conviction"],
    "subtags": [
      { "id": "steadfastness", "sanskrit": "Niṣṭhā", "description": "The stage of spiritual practice where faith becomes immovable and the seeker is firmly fixed in their goal.", "keywords": ["fixed", "steady", "immovable", "conviction"], "examples": ["Being unshaken by external criticism", "Consistent dedication to the spiritual path", "Fixed determination in the higher goal"], "related_tags": ["resolute_intelligence", "determination_modes", "the_victory_of_certainty"] },
      { "id": "the_higher_taste", "sanskrit": "Paraṁ dṛṣṭvā", "description": "The psychological principle of giving up lower habits by experiencing a superior spiritual satisfaction.", "keywords": ["satisfaction", "habit", "pleasure", "spiritual joy"], "examples": ["Natural detachment from worldly vices", "Finding deeper joy in meditation than in sense objects", "Replacing lust with Divine love"], "related_tags": ["detachment_strategy", "inner_sanctuary", "vairagya"] },
      { "id": "faith_as_identity", "sanskrit": "Yo yac-chraddhah sa eva sah", "description": "The ontological truth that a person's character and future are a direct reflection of the quality of their faith.", "keywords": ["identity", "belief", "character", "reflection"], "examples": ["A person being made of their faith", "The internal belief system shaping external reality", "The quality of conviction defining the individual"], "related_tags": ["faith_and_modes", "sincerity_check", "the_nature_of_faith"] },
      { "id": "spiritual_thirst", "sanskrit": "Jijñāsu", "description": "The intense, sincere hunger to know the Absolute Truth and the purpose of existence.", "keywords": ["curiosity", "seeker", "thirst", "inquiry"], "examples": ["Approaching a teacher with honest questions", "The second category of devotees", "Constant search for deeper meaning"], "related_tags": ["types_of_devotees", "intellectual_surrender", "humble_inquiry"] }
    ]
  },
  {
    "id": "RĀJARṢI_ETHICS",
    "title": "Chivalric and Political Code",
    "description": "Focuses on the ethics of leadership, governance, social responsibility, and the use of power.",
    "keywords": ["leadership", "politics", "ethics", "chivalry", "governance"],
    "subtags": [
      { "id": "the_philosopher_king", "sanskrit": "Rājarṣi", "description": "The ideal leader who combines administrative power with deep spiritual wisdom and self-control.", "keywords": ["king", "sage", "leader", "ideal"], "examples": ["Leadership through character and wisdom", "The king as a spiritual example for the public", "Integrating statecraft with Dharma"], "related_tags": ["social_leadership", "dharma_and_krti", "rajarshi_ethics"] },
      { "id": "legitimate_warfare", "sanskrit": "Dharma-yuddha", "description": "The ethical framework for necessary conflict, where force is used as a last resort to protect the righteous.", "keywords": ["war", "ethics", "conflict", "justice"], "examples": ["Fighting against systemic injustice", "The warrior's duty to protect the social order", "Maintaining moral standards even in battle"], "related_tags": ["non_violence_vs_duty", "protection_of_innocents", "moral_crisis"] },
      { "id": "heroic_determination", "sanskrit": "Tejas", "description": "The spiritual brilliance and indomitable courage of a leader that inspires others and conquers obstacles.", "keywords": ["courage", "brilliance", "spirit", "heroism"], "examples": ["The undying spirit of a true leader", "Mental strength in the face of defeat", "Radiating confidence and protective energy"], "related_tags": ["vira_rasa", "intellectual_firmness", "social_leadership"] },
      { "id": "sacrifice_of_self_interest", "sanskrit": "Tyāga", "description": "The hallmark of leadership: the ability to put the welfare of the collective above personal gain or comfort.", "keywords": ["sacrifice", "service", "selflessness", "altruism"], "examples": ["The leader as the primary servant of the people", "Giving up personal luxury for the social good", "Directing all efforts toward loka-sangraha"], "related_tags": ["loka_sangraha", "selfless_service", "renunciation_of_fruit"] }
    ]
  },
  {
    "id": "UPĀSANA_VIDHI",
    "title": "The Mechanics of Worship",
    "description": "Focuses on the practical methods, rituals, and internal techniques used to connect with and worship the Divine.",
    "keywords": ["ritual", "meditation", "worship", "mantra", "practice"],
    "subtags": [
      { "id": "mantra_meditation", "sanskrit": "Japa", "description": "The repetitive, focused chanting of sacred sounds to purify the mind and achieve spiritual absorption.", "keywords": ["chanting", "sound", "repetition", "purification"], "examples": ["Chanting the sacred syllable OM", "Softly reciting the names of the Divine", "Using sound vibration to steady the intellect"], "related_tags": ["the_sacred_syllable", "vocal_offerings", "mental_focus"] },
      { "id": "daily_spiritual_rituals", "sanskrit": "Nitya-karma", "description": "Routine acts of purification, offerings, and study that ground the individual in a spiritual lifestyle.", "keywords": ["routine", "ritual", "daily", "purification"], "examples": ["Morning prayers and ablutions", "Daily reading of the Shastra", "Regular acts of charity and sacrifice"], "related_tags": ["religious_observances", "consistent_practice", "saucam"] },
      { "id": "the_sacred_syllable", "sanskrit": "Praṇava", "description": "The technical and metaphysical focus on the syllable 'OM' as the primordial sound representation of the Absolute.", "keywords": ["OM", "sound", "primordial", "absolute"], "examples": ["Understanding OM as the essence of the Vedas", "Meditating on the sound vibration of the Absolute", "Using OM to begin and end all sacred acts"], "related_tags": ["mantra_meditation", "om_tat_sat", "transcendental_knowledge"] },
      { "id": "prayer_of_surrender", "sanskrit": "Ātma-nivedana", "description": "The culminating act of worship where the seeker offers their entire will and existence to the Divine.", "keywords": ["surrender", "offering", "will", "dedication"], "examples": ["Placing one's life in the hands of God", "Total mental alignment with the Divine Will", "The final stage of the bhakti process"], "related_tags": ["surrender_mechanics", "bhakti_yoga", "the_ultimate_secret"] }
    ]
  }
]

const gitaTagsData = [...wave1, ...wave2]

async function main() {
  console.log('🌱 MANIFESTING THE COMPREHENSIVE BHAGAVAD GĪTĀ SEMANTIC TAGS...')

  const gitaRoot = await prisma.tags.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      slug: 'bhagavad-gita',
      name: 'Bhagavad Gītā',
      sanskrit_name: 'भगवद् गीता',
      type: 'STRUCTURAL'
    }
  })

  for (const category of gitaTagsData) {
    console.log(`⚖️ Processing Gītā Category: ${category.title}...`)

    const categoryTag = await prisma.tags.upsert({
      where: { slug: category.id.toLowerCase() },
      update: {
        parent_id: gitaRoot.id,
        name: category.title,
        description: category.description,
        keywords: category.keywords,
        type: 'GITA_CATEGORY'
      },
      create: {
        slug: category.id.toLowerCase(),
        name: category.title,
        description: category.description,
        keywords: category.keywords,
        type: 'GITA_CATEGORY',
        parent_id: gitaRoot.id
      }
    })

    for (const st of category.subtags) {
      const subtagSlug = st.id.toLowerCase()
      const fullDescription = `${st.description}${st.examples ? '\n\nExamples:\n- ' + st.examples.join('\n- ') : ''}`

      await prisma.tags.upsert({
        where: { slug: subtagSlug },
        update: {
          parent_id: categoryTag.id,
          description: fullDescription,
          keywords: st.keywords,
          sanskrit_name: st.sanskrit,
          type: 'GITA_TOPIC'
        },
        create: {
          slug: subtagSlug,
          name: st.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: fullDescription,
          keywords: st.keywords,
          type: 'GITA_TOPIC',
          parent_id: categoryTag.id,
          sanskrit_name: st.sanskrit
        }
      })
    }
  }

  console.log('✅ THE COMPREHENSIVE BHAGAVAD GĪTĀ SEMANTIC TAGS HAVE BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
