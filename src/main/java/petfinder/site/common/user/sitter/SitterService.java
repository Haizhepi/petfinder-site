package petfinder.site.common.user.sitter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SitterService {
    @Autowired
    private SitterAvailabilityDao sitterAvailabilityDao;

    public Optional<SitterAvailabilityDto> findAvailability(String id) {
        System.out.println("here"+id);
        return sitterAvailabilityDao.findAvailability(id);
    }

    public SitterAvailabilityDto save(SitterAvailabilityDto sitterAvailabilityDto) {
        sitterAvailabilityDao.save(sitterAvailabilityDto);
        return sitterAvailabilityDto;
    }

    public SitterAvailabilityDto update(SitterAvailabilityDto sitterAvailabilityDto) {
        SitterAvailabilityDto temp = null;
        Optional<SitterAvailabilityDto> u = sitterAvailabilityDao.findAvailability(sitterAvailabilityDto.getPrincipal());
        if (u.isPresent()) {
            temp = u.get();
            temp.setAvailability(sitterAvailabilityDto.getAvailability());
            temp.setStartDate(sitterAvailabilityDto.getStartDate());
            temp.setEndDate(sitterAvailabilityDto.getEndDate());
            temp.setStartTime(sitterAvailabilityDto.getStartTime());
            temp.setEndTime(sitterAvailabilityDto.getEndTime());
            sitterAvailabilityDao.save(temp);
        }
        else {
            sitterAvailabilityDao.save(sitterAvailabilityDto);
        }
        return temp;
    }

}
