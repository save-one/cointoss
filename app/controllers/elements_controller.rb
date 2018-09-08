class ElementsController < ApplicationController
	protect_from_forgery except: :update

	def create
	end

	def update
		element = Element.find(params[:id])
		element.update(element_params)
	end

	def destroy
		element = Element.find(params[:id])
		element.destroy
	end

	def add
		element = Element.create
		target_element = TargetElement.create(target_id: params[:target_id], element_id: element.id)
		render :json => element.id
	end

	private

	def element_params
		params.require(:element).permit(:item, :content)
	end
end
