import { PayloadAction } from '@reduxjs/toolkit';
import {
  Entity,
  Field,
  FormState,
  PersonaField,
  PersonaFields,
  QuotesField,
  QuotesFields,
  initialState,
} from './form-state';

export const formReducers = {
  updateField: (
    state: FormState,
    action: PayloadAction<{ entity: Entity; field: Field; value: any }>,
  ) => {
    const { entity, field, value } = action.payload;
    state.currentEntity = entity;
    if (entity === 'persona') {
      if (field == 'imageUrls') {
        state.fields.persona.imageUrls?.push(value);
      } else {
        (state.fields[entity] as PersonaFields)[field as PersonaField] = value;
      }
    } else if (entity === 'quotes') {
      (state.fields[entity] as QuotesFields)[field as QuotesField] = value;
    }
  },
  loadFormData: (
    state: FormState,
    action: PayloadAction<{
      entity: Entity;
      data: PersonaFields | QuotesFields;
    }>,
  ) => {
    const { entity, data } = action.payload;
    console.log('loadFormData', entity, data);
    const currentEntity = (state.currentEntity = entity);
    // @ts-ignore
    state.fields[currentEntity] = data;
  },
  setMultipleFieldErrors: (
    state: FormState,
    action: PayloadAction<{
      entity: Entity;
      errors: Partial<Record<Field, string[]>>;
    }>,
  ) => {
    const { entity, errors } = action.payload;
    state.errors[entity] = errors;
  },
  clearAllErrors: (state: FormState) => {
    state.errors = {
      persona: {},
      quotes: {},
    };
  },
  setFieldError: (
    state: FormState,
    action: PayloadAction<
      | {
          entity: 'persona';
          field: PersonaField;
          errorMessage: string | undefined;
        }
      | {
          entity: 'quotes';
          field: QuotesField;
          errorMessage: string | undefined;
        }
    >,
  ) => {
    const { entity, field, errorMessage } = action.payload;

    if (entity === 'persona') {
      if (errorMessage) {
        state.errors.persona[field] = state.errors.persona[field] || [];
        state.errors.persona[field]!.push(errorMessage);
      } else {
        delete state.errors.persona[field];
      }
    } else {
      if (errorMessage) {
        state.errors.quotes[field] = state.errors.quotes[field] || [];
        state.errors.quotes[field]!.push(errorMessage);
      } else {
        delete state.errors.quotes[field];
      }
    }
  },
  setValidating: (state: FormState, action: PayloadAction<boolean>) => {
    state.status.isValidating = action.payload;
  },
  clearForm: (state: FormState) => {
    state.fields = initialState.fields;
    state.errors = initialState.errors;
    state.status.isValidating = false;
  },
  setFormStatus: (
    state: FormState,
    action: PayloadAction<{ [K in keyof FormState['status']]?: boolean }>,
  ) => {
    state.status = { ...state.status, ...action.payload };
  },
};
