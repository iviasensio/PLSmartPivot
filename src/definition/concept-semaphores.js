const conceptSemaphores = {
  items: {
    AllConcepts: {
      component: 'switch',
      defaultValue: true,
      label: 'All concepts affected',
      options: [
        {
          label: 'On',
          value: true
        },
        {
          label: 'Off',
          value: false
        }
      ],
      ref: 'allsemaphores',
      type: 'boolean'
    },
    ConceptsAffected1: {
      defaultValue: '',
      ref: 'conceptsemaphore1',
      show: data => !data.allsemaphores,
      translation: 'Concept 1',
      type: 'string'
    },
    ConceptsAffected2: {
      defaultValue: '',
      ref: 'conceptsemaphore2',
      show: data => !data.allsemaphores,
      translation: 'Concept 2',
      type: 'string'
    },
    ConceptsAffected3: {
      defaultValue: '',
      ref: 'conceptsemaphore3',
      show: data => !data.allsemaphores,
      translation: 'Concept 3',
      type: 'string'
    },
    ConceptsAffected4: {
      defaultValue: '',
      ref: 'conceptsemaphore4',
      show: data => !data.allsemaphores,
      translation: 'Concept 4',
      type: 'string'
    },
    ConceptsAffected5: {
      defaultValue: '',
      ref: 'conceptsemaphore5',
      show: data => !data.allsemaphores,
      translation: 'Concept 5',
      type: 'string'
    },
    ConceptsAffected6: {
      defaultValue: '',
      ref: 'conceptsemaphore6',
      show: data => !data.allsemaphores,
      translation: 'Concept 6',
      type: 'string'
    },
    ConceptsAffected7: {
      defaultValue: '',
      ref: 'conceptsemaphore7',
      show: data => !data.allsemaphores,
      translation: 'Concept 7',
      type: 'string'
    },
    ConceptsAffected8: {
      defaultValue: '',
      ref: 'conceptsemaphore8',
      show: data => !data.allsemaphores,
      translation: 'Concept 8',
      type: 'string'
    },
    ConceptsAffected9: {
      defaultValue: '',
      ref: 'conceptsemaphore9',
      show: data => !data.allsemaphores,
      translation: 'Concept 9',
      type: 'string'
    },
    // eslint-disable-next-line sort-keys
    ConceptsAffected10: {
      defaultValue: '',
      ref: 'conceptsemaphore10',
      show: data => !data.allsemaphores,
      translation: 'Concept 10',
      type: 'string'
    }
  },
  label: 'Concept Semaphores',
  type: 'items'
};

export default conceptSemaphores;
