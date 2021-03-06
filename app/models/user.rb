class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :timeoutable
         # :lockable,
         #twitter
         # :omniauthable, omniauth_providers: [:twitter]

  has_many :note, :dependent => :destroy
end
