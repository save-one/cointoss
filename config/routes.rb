Rails.application.routes.draw do

  devise_for :users
  root to: "notes#index"

  resources :users, only: [:show, :edit]

  resources :notes, only: [:index, :show, :create, :update, :destroy]

  resources :targets, only: [:create, :update, :destroy]

  resources :items, only: [:create, :update, :destroy]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
