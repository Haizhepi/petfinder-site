package petfinder.site.common.pet;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * If this is your first time looking at Spring Services, check out the detailed explanation in UserService first.
 *
 * This is the service responsible for saving and retrieving pets which are in Elasticsearch.
 */
@Service
public class PetService {
	@Autowired
	private PetDao petDao;

	public Optional<PetDto> findPet(String id) {
		return petDao.findPet(id);
	}

	public PetDto save(AddPetRequest petReq) {
		PetDto pet = new PetDto(petReq.getPetName(), petReq.getType());
		petDao.save(pet);
		return pet;
	}

	public static class AddPetRequest {
		private String petName;
		private String type;

		public String getPetName() {
			return petName;
		}

		public void setPetName(String petName) {
			this.petName = petName;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

	}

}