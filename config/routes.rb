Rails.application.routes.draw do

  devise_for :users
  root to: "notes#index"

  resources :users, only: [:show, :edit]

  resources :notes, only: [:index, :show, :create, :update, :destroy]

  resources :targets, only: [:create, :update, :destroy]

  resources :elements, only: [:create, :update, :destroy]
  get "elements/add" => "elements#add", as: "element_add"
  patch "elements/new_made/:id" => "elements#new_made_update", as: "element_new_made_update"

  # resources :items, only: [:create, :update, :destroy]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
