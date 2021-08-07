import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IFeedback } from '../models/feedback';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class FeedbackStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable feedbackRegistry = new Map();
  @observable feedback: IFeedback | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get feedbacksByDate() {
    return Array.from(this.feedbackRegistry.values()) 
  }

  @action loadFeedbacks = async () => {
    this.loadingInitial = true;
    try {
      const feedbacks = await agent.Feedbacks.list();
      runInAction('loading feedbacks', () => {
        feedbacks.forEach(feedback => {
          this.feedbackRegistry.set(feedback .id, feedback );
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load feedbacks error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadFeedback = async (id: string) => {
    let feedback = this.getFeedback(id);
    if (feedback){
      this.feedback = feedback ;
    } else {
      this.loadingInitial = true;
      try {
        feedback= await agent.Feedbacks.details(id);
        runInAction('getting feedback',() => {
          this.feedback = feedback;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get feedback error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearFeedback = () => {
    this.feedback = null;
  }

  getFeedback = (id: string) => {
    return this.feedbackRegistry.get(id);
  }

  @action createFeedback = async (feedback: IFeedback) => {
    this.submitting = true;
    try {
      await agent.Feedbacks.create(feedback);
      runInAction('create feedback', () => {
        this.feedbackRegistry.set(feedback.id, feedback);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create feedback error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editFeedback = async (feedback: IFeedback) => {
    this.submitting = true;
    try {
      await agent.Feedbacks.update(feedback);
      runInAction('editing feedback', () => {
        this.feedbackRegistry.set(feedback.id, feedback);
        this.feedback = feedback;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit feedback error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteFeedback = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Feedbacks.delete(id);
      runInAction('deleting feedback', () => {
        this.feedbackRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete feedback error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}


